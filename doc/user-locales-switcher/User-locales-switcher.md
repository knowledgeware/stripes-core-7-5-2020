
# User Locales Switcher

This document explains the implementation and structure of the "User Locales Switcher" module including background service.

## Table of contents

* [Introduction](#introduction)
* [Implementation Plan](#implementation-plan)
* [Changes to existing modules](#changes-to-existing-modules)
* [Adding new back-end module](#adding-new-back-end-module)
* [Adding new elements to the Stripes object](#adding-new-elements-to-the-stripes-object)
* [Language section in tenant-settings module](#language-section-in-tenant-settings-module)
    * [Tenant available locales](#tenant-available-locales)
    * [Tenant default locale](#tenant-default-locale)
    * [Default date format for locales](#Default-date-format-for-locales)
* [User language info section in user profile (Users App)](#user-language-info-section-in-user-profile-users-app)
    * [User's locales](#user's-locales)
    * [User's preferred locale](#user's-preferred-locale)
    * [User's numbers shape](#user's-numbers-shape)
* [Language Switcher in `Stripes-core`](#language-switcher-in-Stripes-core)
    * [Folio login locale scenarios‬](#folio-login-locale-scenarios‬)
    * [Folio language switcher scenarios‬](#folio-language-switcher-scenarios)
    * [Adding new navbar‬](#adding-new-navbar)
* [Permissions required](#permissions-required)
    * [Back-end permissions](#back-end-permissions)
    * [UI Permissions](#ui-permissions)
* [Problems and challenges](#problems-and-challenges)
    * [Data loss when switching the language while the form is in progress](#data-loss-when-switching-the-locale-while-the-form-is-in-progress)
* [Recommendations and future work](#recommendations-and-future-work)

## Introduction

## Implementation Plan
  * User locales switcher has five axes:<br />
  1-[Adding new back-end module](#adding-new-back-end-module) called [mod-user-locales](https://github.com/attia-alshareef/mod-user-locales) for handling the server side work needed.<br />
  2- The system administrator chooses the locales available to the tenant and choose the default locale for the tenant of them.<br />
  3- The end user chooses the list of locales he wants to navigate from among the locales available to the tenant and chooses his preferred locale.<br />
  4- Handling the login process in order to log in the user's preferred language if it exists, otherwise the user is login with the default language for the tenant.<br />
  5- Adding language switcher dropdown menue in the `Main Navbar`.
  
  ![User_locales_switcher_Implementation_Plan‬](User_locales_switcher_Implementation_Plan.png "User_locales_switcher_Implementation_Plan‬")

## Changes to existing modules
![Changes_to_existing_modules‬](Changes_to_existing_modules.png "Changes_to_existing_modules‬")


## Adding new back-end module
[mod-user-locales](https://github.com/attia-alshareef/mod-user-locales) is a FOLIO back-end module to manage and handling the server side work needed by "User Locales Switcher" operations which controls the tenant and user locales.

**ModuleDescriptor: https://github.com/attia-alshareef/mod-user-locales/blob/master/descriptors/ModuleDescriptor-template.json 

![mod_user_locales_entity_relationship_diagram‬](mod_user_locales_entity_relationship_diagram.png "mod_user_locales_entity_relationship_diagram")

[mod-user-locales](https://github.com/attia-alshareef/mod-user-locales) contains the following resources:<br />
   * `Locale` -- make a CRUD operations for the tenant available locales including the default date format for locales.
   * `User-Locale` -- make a CRUD operations for the user locales including user's preferred locale and user's numbers shape for the `Arabic` interface.
   

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

## Language section in tenant-settings module
   ## Tenant available locales
   User Locales Switcher supported the following locales:
   |  name                         |     Value     | Default Date Format |
   | ------------------------------|---------------|---------------------|
   | Arabic                        | ar-AR         | YYYY/MM/DD          |
   | English - United States       | en-US         | MM-DD-YYYY          |
   | English - Great Britain       | en-GB         | DD/MM/YYYY          |
   | English - Sweden              | en-SE         | DD/MM/YYYY          |
   | German - Germany              | de-DE         | DD/MM/YYYY          |
   | Italian - Italy               | it-IT         | DD/MM/YYYY          |
   | Spanish                       | es            | DD/MM/YYYY          |
   | Spanish - Latin America       | es-419        | DD/MM/YYYY          |
   | Spanish - Spain               | es-ES         | DD/MM/YYYY          |
   | Portuguese - Brazil           | pt-BR         | DD/MM/YYYY          |
   | Portuguese - Portugal         | pt-PT         | DD/MM/YYYY          |
   | Danish                        | da-DK         | MM-DD-YYYY          |
   | Hungarian                     | hu-HU         | YYYY-MM-DD          |
   | Chinese Simplified            | zh-CN         | MM/DD/YYYY          |
   | Chinese Traditional           | zh-TW         | MM/DD/YYYY          |
   | French - France               | fr-FR         | MM-DD-YYYY          |
   | Japanese                      | ja            | MM/DD/YYYY          |
   | Russian                       | ru            | MM-DD-YYYY          |
   | Hebrew                        | he            | MM-DD-YYYY          |
   | Urdu                          | ur            | DD/MM/YYYY          |
  ```
  { id: '1', name: 'Arabic', value: 'ar-AR', defaultDateFormat: 'YYYY/MM/DD' },
  { id: '2', name: 'English - United States', value: 'en-US', defaultDateFormat: 'MM/DD/YYYY' },
  { id: '3', name: 'English - Great Britain', value: 'en-GB', defaultDateFormat: 'DD/MM/YYYY' },
  { id: '4', name: 'English - Sweden', value: 'en-SE', defaultDateFormat: 'DD/MM/YYYY' },
  { id: '5', name: 'German - Germany', value: 'de-DE', defaultDateFormat: 'DD/MM/YYYY' },
  { id: '6', name: 'Italian - Italy', value: 'it-IT', defaultDateFormat: 'DD/MM/YYYY' },
  { id: '7', name: 'Spanish', value: 'es', defaultDateFormat: 'DD/MM/YYYY' },
  { id: '8', name: 'Spanish - Latin America', value: 'es-419', defaultDateFormat: 'DD/MM/YYYY' },
  { id: '9', name: 'Spanish - Spain', value: 'es-ES', defaultDateFormat: 'DD/MM/YYYY' },
  { id: '10', name: 'Portuguese - Brazil', value: 'pt-BR', defaultDateFormat: 'DD/MM/YYYY' },
  { id: '11', name: 'Portuguese - Portugal', value: 'pt-PT', defaultDateFormat: 'DD/MM/YYYY' },
  { id: '12', name: 'Danish', value: 'da-DK', defaultDateFormat: 'DD-MM-YYYY' },
  { id: '13', name: 'Hungarian', value: 'hu-HU', defaultDateFormat: 'YYYY-MM-DD' },
  { id: '14', name: 'Chinese Simplified', value: 'zh-CN', defaultDateFormat: 'MM/DD/YYYY' },
  { id: '15', name: 'Chinese Traditional', value: 'zh-TW', defaultDateFormat: 'MM/DD/YYYY' },
  { id: '16', name: 'French - France', value: 'fr-FR', defaultDateFormat: 'DD/MM/YYYY' },
  { id: '17', name: 'Hebrew', value: 'he', defaultDateFormat: 'DD/MM/YYYY' },
  { id: '18', name: 'Japanese', value: 'ja', defaultDateFormat: 'MM/DD/YYYY' },
  { id: '19', name: 'Russian', value: 'ru', defaultDateFormat: 'DD/MM/YYYY' },
  { id: '20', name: 'Urdu', value: 'ur', defaultDateFormat: 'DD/MM/YYYY' }
  ```
   
   ## Tenant default locale
   
   ## Default date format for locales
   
## User language info section in User Profile (Users App)
   ## User's locales:
   
   ## User's preferred locale:
   
   ## User's numbers shape
   
## Language Switcher in `Stripes-core`
   ## Folio login locale scenarios
   ![FOLIO_Login_locale_scenarios‬](FOLIO_Login_locale_scenarios.png "FOLIO_Login_locale_scenarios")

   ## Folio language switcher scenarios
   ![FOLIO_Language_Switcher_scenarios‬](FOLIO_Language_Switcher_scenarios.png "FOLIO_Language_Switcher_scenarios")

   ## Adding new navbar‬

## Permissions required
   ## Back-end permissions:
   You can find a back-end permissions required for mod-user-locales in the `ModuleDescriptor` 
   [from here](https://github.com/attia-alshareef/mod-user-locales/blob/master/descriptors/ModuleDescriptor-template.json).
   ## UI Permissions:
   
## Problems and challenges   
   ## Data loss when switching the language while the form is in progress

## Recommendations and future work
