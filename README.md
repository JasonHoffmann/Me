# /Me

[![Gitter](https://badges.gitter.im/JasonHoffmann/Me.svg)](https://gitter.im/JasonHoffmann/Me?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

/Me (working title) is a personal management app built on top of WordPress and the WP REST API. /Me is broken into modules, each of which is meant to help you take control of your own data and replace a lot of different services out there that we've become too reliant on. The good news is WordPress can support these now and /Me aims to help you transform your personal site into more then just a publishing platform.

Right now, the plannet modules I've thought of are:
- Note Taking: something similar to Evernote or Simplenote, a place to store and organize notes
- Bookmarks: Looking to Pinboard (https://pinboard.in/) as an example here. A way to manage your bookmarks, store links, and use the "Press This" bookmarklet to store even more.
- RSS Feed: Maybe something derivative or integrated with Tiny Tiny RSS (https://tt-rss.org/gitlab/fox/tt-rss/wikis/home).
- Social Media Channels: This is a BIG one. There's a lot to be done, but the first step I think would be to pull in your likes favorites / replies / comments across all social media platforms, and provide a way to publish to these sites too. I'm looking towards Known (https://withknown.com/) for inspiration here. I also think this is more of a long term goal.
- File Management: a la Dropbox or Google Drive. Wondering if this one is worth it
Movie / Book / Music Tracker: For personal libraries and tracking things. Again, lots of third party sites that do this out there.
- And probably others...

But the first draft of this plugin will keep things simple. I will be working on building out a client-side application with working implementation osf bookmarks and notes. But I'm DEFINITELY open to new ideas.

### Dependencies
/Me relies on the latest version of WordPress, v 4.4 at the time of writing. This is required to make the API play nice.

For the front-end, I've selected (VueJS)[http://vuejs.org/] as a framework. It's lightweight and fairly easy to get started with. There's a little more info on how this works below.

To develop this plugin, Node is also required for running gulp and some other build-step dependencies.

### Contributing
I am currently working out the features that will need to be added to make this plugin work, but I'm definitely looking for designers, WordPress and Javascript developers to help out. I think is is an ambitious and worthwhile project. If you agree you can post to issues and let me know, or feel free to reach out on (Twitter)[https://twitter.com/jay_hoffmann].

To see the plugin in action visit Settings -> /Me in the admin and activate the "Notes" module. Then, simply go to "http://YOURSITE.com/me". This is how you can navigate through the modules and see how notes are working.

All of the front-end code for this plugin is in the `/front` folder of this plugin. The rest of the plugin simply sets up the endpoints necessary for this Javascript to work, and sets up a basic module system, based on Jetpack.

If you want to get started, pull down the repo and cd into into `/front`. From there, run

    npm install

The plugin also uses jspm to do some transpiling of modules, so you'll need to install these dependencies with:

    jspm install

With that set up you can just run:

    gulp

And the page will be live-reloaded as you edit the JS files, which are contained in `front/app`. 

All of the CSS for this plugin is contained in `front/css`, in a single file at the moment. One goal is to port this over to SASS. If you want to start working with the plugin, refer below for a little bit about how the Javascript is set up.

### Development Philosophy
As mentioned, this plugin uses the WordPress REST API and a heavy dose of Javascript to do it's work. VueJS is used to set up this front-end and I've tried to set this up in a modular way that makes it very accessible.

Vue works by breaking down things into components, but it starts with a router. `front/app/router.js` sets up the routes for the plugin. Each route is passed a component name. These components set up the functionality for each piece of the application.

Componenets have been placed in `front/sections`. There are only two at the moment, `sections/index.js` which sets up the basic screen that let's users navigate between components and `sections/notes/index.js` which contains the basic note taking app.

There are also two more folders to take note of. The first is `front/stores`. This app uses the store pattern, which basically means that the state of the app is held in an object, which is then passed down to components. There is an explanation of how this works over on the (Vue Guide)[http://vuejs.org/guide/application.html#State_Management], but basically the store is the source of truth throughout the entire application. So when a user clicks on a button, we are actually calling an event on the store file, which will change the data. Vue is reactive, which means that any changes in the data will automatically be reflected in the views. So all we need to do is change the state through a basic method, and everything else is taken care of. This let's us right very little code, and keep all the logic in one place.

The store also calls on `app/api/index.js` which simply is a wrapper for connecting to the back-end of our application. It's not the most elegant solution but it keeps things fairly simple. Right now it depends on (Vue-resource)[https://github.com/vuejs/vue-resource], but there is probably a way to rewrite this to depend on something a little more lightweight.

Hopefully it is easy to follow the flow of data and events that are happening, but let me know if there are any questions.

### Future Features
Right now, the primary focus is getting Notes and bookmarks up and running. A very simple notes app has been added, but several features need to be added to get this ready:
- Labels for notes
- Note search
- Proper empty states
- Autosave functionality
- And lots more!