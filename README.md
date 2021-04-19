# Project 4: Around The U.S.

## Overview

### This project is hub for photos collected during a user's trip **Around the World**! In this case, these photos document my personal thru-hiking journey along the [Appalachian Trail](https://en.wikipedia.org/wiki/Appalachian_Trail). Currently, this hub allows a user to update their profile and like photos. They can update their name and title via a popup form and they can like photos by clicking the hearts displayed below each photo. Unfortunately, all of this updated information will reset after page refresh, but we're working on that.

---

## Technologies Used

- **Figma**

  - The layout for this project is based off of a Figma specification sheet designed by another [Practicum by Yandex](https://practicum.yandex.com/). Figma allows designers to put communicate their visions to developers without having to worry about how it will be coded.
  - This design dictates how the page should appear to desktop users and mobile users. Designs for both the how the page upon initial load, as well as the page with the profile editor opened, should appear are displayed. [Check out the design here.](https://www.figma.com/file/SurN1jaeEQIhuZEDMhmWWf/Sprint-4-Around-The-U.S.-desktop-mobile?node-id=0%3A1)

- **Media Queries**

  - In order to create a page that responds to the viewport size through which the user views the page, [Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries) were put to use. Users viewing the page on screens of all sizes (large desktops, average laptops, iPads, smartphones etc.) will each view a page designed for their individual experience.

- **Javascript**

  - This is the first project that contains any Javascript, which is very exciting. Specifically, this project implements [Event Listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) to perform certain actions based on user events. Currently, this project will open an editor when the "edit" button is clicked, it will close the editor without saving if the "X" button or the "Escape" key is actioned when the editor is open, it will save the form values when the "Save" button or the "Enter" key is actioned when the editor is opened, and it will toggle the appearance of the heart when an individual heart is clicked. Also, An alert will appear if the user attempts to add a photo. This functionality will be implemented on a later date.
  - Recent update adds functionality to the "+" button. Users may now input their own photos from external urls. The title added to the post will automatically set the alt attibute of the image as the value of the title inpue.
  - Users may now examine each photo in its original aspect ratio by clicked on an image to enlarge it.
  - "Like" and "Delete" functionality has been updated to allow users to interact with both initial posts and subsequently updated posts. In future releases, the state of each "Like" and "Delete" will remain after page refresh. Currently, all input data is erased on page refresh.

- **Git**
  - While this is invisible to the user, an important addition to this project was the use of a development branch with distinct feature branches implemented on initial page construction. When the page is live, work can still be done and committed in pieces without disturbing the live version of the page. Using branches in this way is real-world development, and the use of them on this individual project is practice for when we begin working on projects with others.

## Future Plans

- Save information (edited profile, uploaded photo, like photo) into a database for future reference after page refresh.
- Allow user authentication.

## [Check out this project live!](https://mccambley.github.io/web_project_4/)
