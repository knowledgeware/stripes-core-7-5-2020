
# User Locales Switcher

This document explains the implementation and archticher of "User Locales Switcher" module including back-end service.


## Table of contents

* [Introduction](#introduction)
* [Implementation](#implementation)
* [Adding new back-end module](#adding-new-back-end-module)
* [Adding new elements to the Stripes object](#adding-new-elements-to-the-stripes-object)
* [Changes to existing modules](#changes-to-existing-modules)
* [Language section in tenant-settings module](#language-section-in-tenant-settings-module)
    * [Tenant available locales](#tenant-available-locales)
    * [Tenant default locale](#tenant-default-locale)
    * [Default date format for locales](#Default-date-format-for-locales)
* [User language info section in user profile (Users App)](#user-language-info-section-in-user-profile-users-app)
* [User Language Switcher in main navbar (Stripes-core)](#user-language-switcher-in-main-navbar-stripes-core)


## Introduction

## Implementation
  * User locales switcher has four axes:<br />
  1-[Adding new back-end module](#adding-new-back-end-module) called [mod-user-locales](https://github.com/attia-alshareef/mod-user-locales) for handling the server side work needed.<br />
  2- The system administrator chooses the locales available to the tenant and choose the default locale for the tenant of them.<br />
  3- The end user chooses the list of locales he wants to navigate from among the locales available to the tenant and chooses his preferred locale.<br />
  4- Handling the login process in order to log in the user's preferred language if it exists, otherwise the login is in the default language for the tenant.<br />
  
![FOLIO_Login_locale_scenarios‬](FOLIO_Login_locale_scenarios.png "FOLIO_Login_locale_scenarios")

## Adding new back-end module

## Adding new elements to the Stripes object
   * We add the following elements to the Stripes object:<br />
     * `tenantLocales` -- an array of objects specifying the locales available to the tenant.
     * `setTenantLocales` -- a function by which client code can change the locales available to the tenant.
     * `tenantDefaultLocale` -- a short string specifying the prevailing default locale for the tenant, e.g. `en-US`.
     * `setTenantDefaultLocale` -- a function by which client code can change the prevailing tenantDefaultLocale: `stripes.setTenantDefaultLocale('en-US')`.
     * `dateformat` -- a short string specifying the prevailing date format for the current locale, e.g. `MM-DD-YYYY` When you are in the `English - United States` interface.
     * `setDateformat` -- a function by which client code can change the prevailing dateformat: `stripes.dateformat('YYYY/MM/DD')` When you are in the `Arabic` interface.
     * `userLocales` -- an array of objects specifying the locales list of the current logged in user.
     * `setUserLocales` -- a function by which client code can change the prevailing userLocales: `stripes.setUserLocales([{...}, {...}, {...}])`.
     * `userPreferredLocale` -- a short string specifying the prevailing user's preferred locale of the current logged in user, e.g. `en-US` or `ar-AR`.
     * `setUserPreferredLocale` -- a function by which client code can change the current logged in user's preferred locale: `stripes.setUserPreferredLocale('en-US')`
     * `userNumbersShape` -- a short string specifying the prevailing NumbersShape of the current logged in user, e.g. `Arabic` or `Hindu` When you are in the `Arabic` interface only.
     * `setUserNumbersShape` -- a function by which client code can change the current logged in user's numbers shape: `stripes.setUserNumbersShape('en')` for the `Arabic` numbers shape and `stripes.setUserNumbersShape('ar')` for the `Hindu` numbers shape.


## Changes to existing modules
![Changes_to_existing_modules‬](Changes_to_existing_modules.png "Changes_to_existing_modules‬")

## Language section in tenant-settings module
   ## Tenant available locales
   ![Tenant_available_languages‬](Tenant_available_languages.png "Tenant_available_languages‬")
   
   ## Tenant default locale
   
   ## Default date format for locales
   
## User language info section in User Profile (Users App)

## User Language Switcher in main navbar (Stripes-core)

![FOLIO_Language_Switcher_scenarios‬](FOLIO_Language_Switcher_scenarios.png "FOLIO_Language_Switcher_scenarios")

