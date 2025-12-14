# Albert Calendar Web Component

Albert Calendar is a reusable custom calendar implemented as a **native Web Component** using **Custom Elements** and **Shadow DOM**.  
It can be embedded into any HTML page as a simple custom tag.

---

## Features

- Custom HTML tag: `<albert-calendar>`
- Built with **vanilla JavaScript** (no frameworks)
- Uses **Shadow DOM** for style and DOM isolation
- Displays the current month
- Highlights **today’s date**
- Works in any modern browser
- Easy to embed in any HTML page

---

## Demo

```html
<albert-calendar></albert-calendar>

Installation / Usage
1. Include the script

Place the JavaScript file on your page (locally or via hosting):

<script src="albert-calendar.js"></script>

2. Use the custom element
<albert-calendar></albert-calendar>

Example Full HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Albert Calendar Demo</title>
</head>
<body>

  <h1>Calendar Example</h1>

  <albert-calendar></albert-calendar>

  <script src="albert-calendar.js"></script>
</body>
</html>

How It Works

The component is registered using customElements.define

The browser creates an instance of AlbertCalendar when it encounters <albert-calendar>

connectedCallback() triggers rendering

Shadow DOM ensures:

Styles do not leak outside the component

External styles do not affect the calendar

The current date is detected using JavaScript Date and highlighted with a dedicated CSS class


License
This project is provided for educational purposes.