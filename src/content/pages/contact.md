---
title: Contact Me 📧
permalink: /contact/
---

<form name="contact" method="POST" data-netlify="true" action="/thank-you/">
  <div class="row">
    <div class="col-lg-6">
      <label for="name">Your Name:</label>
      <input class="form-control" type="text" name="name" required />
    </div>
    <div class="col-lg-6">
      <label for="email">Your Email:</label>
      <input class="form-control" type="email" name="email" required />
    </div>
    <div class="col">
      <label for="message">Message:</label>
      <textarea class="form-control" name="message"></textarea>
    </div>
  </div>
  <p class="mt-3">
    <button type="submit">Send</button>
  </p>
</form>
