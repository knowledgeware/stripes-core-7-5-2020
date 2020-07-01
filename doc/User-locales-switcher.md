
# User Locales Switcher

This document lays out requirements for settings and preferences, as discussed in [UIP-1](https://issues.folio.org/browse/UIP-1), and proposes how Stripes should support them. These concepts are similar but distinct, and properly supporting both will require changes to the Stripes core.


## Table of contents

<!-- md2toc -l 2 -s 1 settings-and-preferences.md -->
* [Tenant-level and user-level configuration](#tenant-level-and-user-level-configuration)
    * [Tenant defaults for user preferences](#tenant-defaults-for-user-preferences)
* [UX concerns](#ux-concerns)
* [Software requirements](#software-requirements)
    * [How should a module supply a preferences component?](#how-should-a-module-supply-a-preferences-component)
* [Changes to existing modules](#changes-to-existing-modules)
* [Architectural considerations](#architectural-considerations)
    * [Multiple module types](#multiple-module-types)
    * [Settings and Preferences as actual modules](#settings-and-preferences-as-actual-modules)


## Tenant-level and user-level configuration

Stripes provides means for users to configure FOLIO. Such configuration can be either global across an entire tenant, or local to specific user.

* _Settings_ refer to tenant-level configuration, such as the loan policies in use, the resource-types available for cataloging, and the patron groups to which users can belong.

* _Preferences_ refer to user-level configuration, such as the avatar to be displayed, notification preferences, and the password in use.

* We use _configuration_ as a general term that encompasses both settings and preferences.

In many cases, the two levels of configuration are disjoint: there is no such thing as a user-level preference for which loan policies are in user, or a tenant-level setting of a user's avatar.

However, some configuration makes sense at both levels: for example, consider the choice of localization. A university in Texas may set the locale to `en-US` (English, United States), since it is primarily Anglophone; but many individual users may be primarily Spanish-speaking, and will want to set a user-level preference for the `es` locale. In such cases, the user-level preference should always override the tenant-level setting.
