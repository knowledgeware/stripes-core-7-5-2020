function setCurrentUser(currentUser) {
  return {
    type: 'SET_CURRENT_USER',
    currentUser,
  };
}

function clearCurrentUser() {
  return {
    type: 'CLEAR_CURRENT_USER',
  };
}

function setCurrentPerms(currentPerms) {
  return {
    type: 'SET_CURRENT_PERMS',
    currentPerms,
  };
}

function setLocale(locale) {
  return {
    type: 'SET_LOCALE',
    locale,
  };
}

function setUserNumbersShape(userNumbersShape) {
  return {
    type: 'SET_USERNUMBERSSHAPE',
    userNumbersShape,
  };
}

function setDateformat(dateformat) {
  return {
    type: 'SET_DATEFORMAT',
    dateformat,
  };
}

function setTimezone(timezone) {
  return {
    type: 'SET_TIMEZONE',
    timezone,
  };
}

function setCurrency(currency) {
  return {
    type: 'SET_CURRENCY',
    currency,
  };
}

function setPlugins(plugins) {
  return {
    type: 'SET_PLUGINS',
    plugins,
  };
}

function setSinglePlugin(name, value) {
  return {
    type: 'SET_SINGLE_PLUGIN',
    name,
    value,
  };
}

function setBindings(bindings) {
  return {
    type: 'SET_BINDINGS',
    bindings,
  };
}

function setOkapiToken(token) {
  return {
    type: 'SET_OKAPI_TOKEN',
    token,
  };
}

function clearOkapiToken() {
  return {
    type: 'CLEAR_OKAPI_TOKEN',
  };
}

function setAuthError(message) {
  return {
    type: 'SET_AUTH_FAILURE',
    message,
  };
}

function setTranslations(translations) {
  return {
    type: 'SET_TRANSLATIONS',
    translations,
  };
}

function checkSSO(ssoEnabled) {
  return {
    type: 'CHECK_SSO',
    ssoEnabled,
  };
}

function setOkapiReady() {
  return {
    type: 'OKAPI_READY',
  };
}

function setServerDown() {
  return {
    type: 'SERVER_DOWN',
  };
}

function setSessionData(session) {
  return {
    type: 'SET_SESSION_DATA',
    session,
  };
}

function setCurrentServicePoint(servicePoint) {
  return {
    type: 'SET_CURRENT_SERVICE_POINT',
    servicePoint,
  };
}

function setUserServicePoints(servicePoints) {
  return {
    type: 'SET_USER_SERVICE_POINTS',
    servicePoints,
  };
}


function setTenantLocales(tenantLocales) {
  return {
    type: 'SET_TENANT_LOCALES',
    tenantLocales,
  };
}

function setUserLocales(userLocales) {
  return {
    type: 'SET_USER_LOCALES',
    userLocales,
  };
}

function setUserPreferredLocale(userPreferredLocale) {
  return {
    type: 'SET_USER_PREFERRED_LOCALE',
    userPreferredLocale,
  };
}

function setTenantDefaultLocale(tenantDefaultLocale) {
  return {
    type: 'SET_TENANT_DEFAULT_LOCALE',
    tenantDefaultLocale,
  };
}

export {
  setCurrentUser,
  clearCurrentUser,
  setCurrentPerms,
  setLocale,
  setUserNumbersShape,
  setDateformat,
  setTimezone,
  setCurrency,
  setPlugins,
  setSinglePlugin,
  setBindings,
  setOkapiToken,
  clearOkapiToken,
  setAuthError,
  setTranslations,
  checkSSO,
  setOkapiReady,
  setServerDown,
  setSessionData,
  setCurrentServicePoint,
  setUserServicePoints,
  setTenantLocales,
  setUserLocales,
  setUserPreferredLocale,
  setTenantDefaultLocale
};
