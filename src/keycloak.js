import Keycloak from "keycloak-js";

const keycloak = new Keycloak("/keycloak.json");

/**
 * Initialize Keycloak and silently checking for an existing login
 * @description should be called before render() of app
 * @returns {Promise<void>} Promise
 */
export const initialize = () => {
    const config = {
        checkLoginIframe: false,
        onLoad:"check-sso",
        silentCheckSsoRedirecturi:
        window.location.origin + "/silent-check-sso.html",
    };
    return keycloak.init(config);
};

/** @type {Keycloak} keycloak */
export default keycloak;