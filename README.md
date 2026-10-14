# WEB103 Project 4 - *Skyward: Hot Air Balloon Builder*

Submitted by: **Iman Zahid**

About this web app: **Skyward lets you design a magical hot air balloon ride. Pick a balloon design, a sky, a basket, how many people are coming, and a magic extra like floating lanterns or fireworks. A big layered picture updates as you choose, the price counts up or down live, and options that do not work together are locked before you can pick them. Save your rides, then view, edit, or delete them any time.**

Time spent: **8** hours

## Required Features

The following **required** functionality is completed:

<!-- Make sure to check off completed functionality below -->
- [x] **The web app uses React to display data from the API.**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured `CustomItem` table.**
  - [x]  **NOTE: Your walkthrough added to the README must include a view of your Render dashboard demonstrating that your Postgres database is available**
  - [x]  **NOTE: Your walkthrough added to the README must include a demonstration of your table contents. Use the psql command 'SELECT * FROM tablename;' to display your table contents.**
- [x] **Users can view **multiple** features of the `CustomItem` (e.g. car) they can customize, (e.g. wheels, exterior, etc.)**
- [x] **Each customizable feature has multiple options to choose from (e.g. exterior could be red, blue, black, etc.)**
- [x] **On selecting each option, the displayed visual icon for the `CustomItem` updates to match the option the user chose.**
- [x] **The price of the `CustomItem` (e.g. car) changes dynamically as different options are selected *OR* The app displays the total price of all features.**
- [x] **The visual interface changes in response to at least one customizable feature.**
- [x] **The user can submit their choices to save the item to the list of created `CustomItem`s.**
- [x] **If a user submits a feature combo that is impossible, they should receive an appropriate error message and the item should not be saved to the database.**
- [x] **Users can view a list of all submitted `CustomItem`s.**
- [x] **Users can edit a submitted `CustomItem` from the list view of submitted `CustomItem`s.**
- [x] **Users can delete a submitted `CustomItem` from the list view of submitted `CustomItem`s.**
- [x] **Users can update or delete `CustomItem`s that have been created from the detail page.**


The following **optional** features are implemented:

- [x] Selecting particular options prevents incompatible options from being selected even before form submission

The following **additional** features are implemented:

- [x] A 3 layer picture (sky, balloon with basket, magic extra) that updates live as you pick options
- [x] The sky crossfades when it changes, extras fade in, and the balloon gently bobs up and down
- [x] The balloon gets a little darker on the Starry Night sky so it fits the night
- [x] Fireworks use `mix-blend-mode: screen` so their black background disappears and only the glow shows
- [x] The total price counts up or down smoothly when options change
- [x] Locked options show a lock icon and a short reason, like "Only at night" or "Cozy fits 2"
- [x] Auto fix: if changing the sky or basket breaks an earlier choice, that choice is reset and a friendly message explains why
- [x] The server checks the same combo rules and returns a `400` error with the message, so a bad combo can never be saved, even without the website
- [x] The server works out the total price from the `options` table, so the price cannot be faked
- [x] Delete asks "Are you sure?" before removing a balloon
- [x] Each saved balloon has its own name
- [x] Works on phones: the picture goes on top and the options go below
- [x] Images converted to WebP, so all 16 load in about 3 MB instead of 20 MB

## Video Walkthrough

https://github.com/user-attachments/assets/0b3d57ab-a47c-435e-a833-05de108a1cdf

## Notes

**Run it yourself.**

1. Run `npm install`.
2. Create `server/.env` with `PGUSER`, `PGPASSWORD`, `PGHOST`, `PGPORT`, and `PGDATABASE` from your Render Postgres database.
3. Run `npm run reset` to create the tables and fill the options.
4. Run `npm run dev` and open http://localhost:5173.
