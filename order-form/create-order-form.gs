/**
 * Gorda's Goodies — one-time setup for the online order form.
 *
 * HOW TO USE (about 5 minutes):
 *  1. Sign in to Google as gordasgoodies@gmail.com (this account will own the
 *     form and send/receive the notification emails).
 *  2. Go to https://script.google.com  ->  New project.
 *  3. Delete the sample code, paste this whole file, click Save.
 *  4. Pick "createOrderForm" in the function dropdown and click Run.
 *  5. Approve the permission prompts (Forms, Sheets, Gmail send).
 *  6. Open View -> Logs (or Execution log). Copy the three links it prints:
 *     the public form link, the edit link, and the orders spreadsheet link.
 *
 * WHAT IT CREATES:
 *  - The order form, with a "Large order" branch (10+ boxes) that asks the
 *    customer to email us to arrange a deposit.
 *  - A Google Sheet that collects every response (your order list).
 *  - An email to gordasgoodies@gmail.com on every submission, plus an
 *    automatic "we got your request" email to the customer.
 *
 * Run createOrderForm ONCE. Running it again makes a second, separate form.
 *
 * ALREADY RAN createOrderForm, and the live form still has delivery/shipping
 * questions on it? Don't re-run createOrderForm (it would make a duplicate
 * form). Instead paste this updated file over the old code in the same
 * script.google.com project, pick "fixOrderForm" in the dropdown, and run
 * that instead — it finds your existing form by name and removes the
 * delivery/shipping options from it (pickup-only, for now).
 */

const NOTIFY_EMAIL = 'gordasgoodies@gmail.com';
const FLAVORS = [
  'Classic (Shortbread)',
  'Anise (Traditional)',
  'Mocha (GG Original)',
  'Chocolate (Pre-order)',
  'Pumpkin Spice (Seasonal)',
  'Coconut (Pre-order)',
];
const OCCASIONS = [
  'Just because / everyday treat',
  'Birthday or milestone',
  'Graduation',
  'Wedding, baby shower, or bridal shower',
  'Holiday or religious event',
  "Mother's Day / Father's Day",
  'Corporate or dinner party',
  'Other',
];

function createOrderForm() {
  const form = FormApp.create("Gorda's Goodies — Order Request");
  form.setDescription(
    "Thanks for ordering from Gorda's Goodies! Fill this out and we'll email or text you " +
    'to confirm availability and your total. Please allow at least 48 hours. ' +
    'Your order is confirmed once payment is received (Venmo @GordasGoodiesLLC or Zelle 703-586-7359).'
  );
  form.setConfirmationMessage(
    "Thank you! We got your order request and will reach out shortly to confirm your total and pickup details. " +
    "Your order is confirmed once payment is received. ¡Qué rico!"
  );
  form.setShowLinkToRespondAgain(true);
  form.setCollectEmail(false);

  // ---------- Page 1: about you + order size ----------
  form.addTextItem().setTitle('Your name').setRequired(true);
  form.addTextItem().setTitle('Phone number').setHelpText('We may text you to confirm.').setRequired(true);
  form.addTextItem()
    .setTitle('Email')
    .setRequired(true)
    .setValidation(FormApp.createTextValidation().requireTextIsEmail().build());
  form.addMultipleChoiceItem()
    .setTitle('Best way to reach you')
    .setChoiceValues(['Text', 'Phone call', 'Email', 'Instagram DM'])
    .setRequired(true);

  const gate = form.addMultipleChoiceItem()
    .setTitle('How big is your order?')
    .setHelpText(
      'A large order is 10 or more boxes (a box is 6 cookies). At 2–3 cookies per person, ' +
      '10 boxes feeds roughly 20–30 guests. Large orders need a deposit to secure your date.'
    )
    .setRequired(true);

  // ---------- Page 2: regular order ----------
  const pageRegular = form.addPageBreakItem()
    .setTitle('Your order')
    .setHelpText('Tell us what you would like. Prices are on the Menu page of our website.');
  pageRegular.setGoToPage(FormApp.PageNavigationType.SUBMIT); // regular orders skip the large-order page

  form.addDateItem()
    .setTitle('Date you need it')
    .setHelpText('Please allow at least 48 hours. Pickup only, in Springfield, VA — we do not currently offer delivery or shipping.')
    .setRequired(true);
  form.addTextItem().setTitle('Preferred pickup time (optional)');

  form.addGridItem()
    .setTitle('Alfajores — how many boxes of 6 of each flavor?')
    .setHelpText('$8.50 + tax per box. Leave a flavor blank if you do not want it. Pre-order flavors may need extra lead time; we will confirm.')
    .setRows(FLAVORS)
    .setColumns(['1', '2', '3', '4', '5', '6', '7', '8', '9']);
  form.addMultipleChoiceItem()
    .setTitle('Cookie size')
    .setChoiceValues([
      'Standard, 4 cm (about the size of a 50-cent coin)',
      'Mini, 3 cm (recommended for larger gatherings) — we will confirm pricing',
    ]);
  form.addListItem()
    .setTitle('Crumb Cake (2 slices each, $7 + tax)')
    .setHelpText('Has a buttery toffee nut topping.')
    .setChoiceValues(['0', '1', '2', '3', '4', '5']);
  form.addListItem()
    .setTitle('Sticky Toffee Cupcakes ($8 + tax each)')
    .setChoiceValues(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);

  form.addListItem().setTitle('What is the occasion?').setChoiceValues(OCCASIONS);
  form.addParagraphTextItem()
    .setTitle('Custom design or photo requests (optional)')
    .setHelpText('For example: name or photo of a graduate, colors, theme, packaging or gift-box wishes.');
  form.addParagraphTextItem()
    .setTitle('Allergies or dietary needs (optional)')
    .setHelpText('Please tell us so we can help. Note: the crumb cake has a toffee nut topping.');
  form.addMultipleChoiceItem()
    .setTitle('How would you like to pay?')
    .setHelpText('Send payment after we confirm your total. Venmo: @GordasGoodiesLLC — Zelle: 703-586-7359.')
    .setChoiceValues(['Venmo', 'Zelle'])
    .setRequired(true);
  form.addListItem()
    .setTitle('How did you hear about us? (optional)')
    .setChoiceValues(['Instagram', 'Friend or family', 'Event or market', 'Google or website', 'Other']);
  form.addParagraphTextItem().setTitle('Anything else we should know? (optional)');
  form.addCheckboxItem()
    .setTitle('Please confirm')
    .setChoiceValues(['I understand orders need at least 48 hours notice and are confirmed once payment is received.'])
    .setRequired(true);

  // ---------- Page 3: large order ----------
  const pageLarge = form.addPageBreakItem()
    .setTitle('Large order (10+ boxes)')
    .setHelpText(
      'Large orders need a deposit to secure your date. After you submit this form, please EMAIL ' +
      NOTIFY_EMAIL + ' and we will confirm your total and the deposit amount. Your date is secured once the deposit is received.'
    );

  form.addDateItem().setTitle('Date of your event or pickup').setRequired(true);
  form.addTextItem()
    .setTitle('About how many guests?')
    .setHelpText('A good rule: 2–3 cookies per person. 10 boxes = 60 cookies.')
    .setRequired(true);
  form.addListItem().setTitle('What is the occasion?').setChoiceValues(OCCASIONS).setRequired(true);
  form.addParagraphTextItem()
    .setTitle('What are you picturing?')
    .setHelpText('Flavors, sizes (standard 4 cm or mini 3 cm), custom design or photo, packaging, budget — anything helps.')
    .setRequired(true);
  form.addParagraphTextItem()
    .setTitle('Allergies or dietary needs (optional)');
  form.addCheckboxItem()
    .setTitle('Please confirm')
    .setChoiceValues(['I will email ' + NOTIFY_EMAIL + ' to arrange the deposit that secures my order.'])
    .setRequired(true);

  // Branching from the size question
  gate.setChoices([
    gate.createChoice('Regular order — fewer than 10 boxes', pageRegular),
    gate.createChoice('Large order — 10 or more boxes', pageLarge),
  ]);

  // ---------- Responses go to a Google Sheet ----------
  const ss = SpreadsheetApp.create("Gorda's Goodies — Orders");
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  // ---------- Email on every submission ----------
  ScriptApp.newTrigger('onOrderSubmit').forForm(form).onFormSubmit().create();

  Logger.log('PUBLIC FORM LINK (send this to Claude / put on the website): ' + form.getPublishedUrl());
  Logger.log('EDIT LINK: ' + form.getEditUrl());
  Logger.log('ORDERS SPREADSHEET: ' + ss.getUrl());
}

/** Runs automatically on each submission. */
function onOrderSubmit(e) {
  const answers = [];
  let customerEmail = '';
  let customerName = '';
  let isLarge = false;

  e.response.getItemResponses().forEach(function (ir) {
    const title = ir.getItem().getTitle();
    const value = ir.getResponse(); // grid answers are an array: one entry per flavor row
    if (title === 'Email') customerEmail = value;
    if (title === 'Your name') customerName = value;
    if (title === 'How big is your order?' && String(value).indexOf('Large') === 0) isLarge = true;

    if (title.indexOf('Alfajores') === 0 && Array.isArray(value)) {
      const lines = [];
      FLAVORS.forEach(function (flavor, i) {
        if (value[i]) lines.push('   ' + flavor + ': ' + value[i] + ' box(es)');
      });
      answers.push(title + '\n' + (lines.length ? lines.join('\n') : '   (none)'));
    } else {
      answers.push(title + '\n   ' + (Array.isArray(value) ? value.join(', ') : value));
    }
  });

  const subject = (isLarge ? 'LARGE ORDER (deposit needed) — ' : 'New order — ') + (customerName || 'website');
  MailApp.sendEmail(NOTIFY_EMAIL, subject, answers.join('\n\n'));

  if (customerEmail) {
    try {
      let body = 'Hi ' + (customerName || 'there') + ',\n\nThank you for your order request with Gorda\'s Goodies! ' +
        "We'll be in touch shortly to confirm your total and details.\n\n";
      body += isLarge
        ? 'Because this is a large order, please email ' + NOTIFY_EMAIL + ' to arrange the deposit that secures your date.\n\n'
        : 'Your order is confirmed once payment is received (Venmo @GordasGoodiesLLC or Zelle 703-586-7359).\n\n';
      body += '¡Qué rico!\nGorda\'s Goodies';
      MailApp.sendEmail({ to: customerEmail, subject: "We got your Gorda's Goodies order request", body: body, replyTo: NOTIFY_EMAIL, name: "Gorda's Goodies" });
    } catch (err) {
      // never let a bad customer email address block the owner notification
    }
  }
}

/**
 * One-time patch for a form that was already created by createOrderForm()
 * before we decided against delivery/shipping. Finds the live form by its
 * exact title, then:
 *  - removes the "Pickup, delivery, or shipping?" question (both the
 *    regular-order and large-order copies of it) -- everything is pickup
 *    in Springfield, VA now, so the question is no longer needed
 *  - removes the "Delivery or shipping address (optional)" question
 *  - renames "Preferred pickup or delivery time" to "Preferred pickup time"
 *  - updates the date-question help text and the submit confirmation
 *    message to say pickup-only instead of pickup/delivery
 *
 * Safe to run more than once -- items that are already gone or already
 * renamed are just skipped.
 */
function fixOrderForm() {
  const FORM_TITLE = "Gorda's Goodies — Order Request";
  const files = DriveApp.getFilesByType(MimeType.GOOGLE_FORMS);
  let formFile = null;
  while (files.hasNext()) {
    const f = files.next();
    if (f.getName() === FORM_TITLE) { formFile = f; break; }
  }
  if (!formFile) {
    throw new Error(
      'Could not find a form named "' + FORM_TITLE + '" in this Google account\'s ' +
      'Drive. Make sure you are signed in as the same account that ran createOrderForm ' +
      '(gordasgoodies@gmail.com), or open the form, copy the long ID from its edit URL ' +
      '(the part between /d/ and /edit), and replace the DriveApp lookup above with ' +
      'FormApp.openById(\'PASTE_ID_HERE\').'
    );
  }

  const form = FormApp.openById(formFile.getId());
  let removed = 0, renamed = 0;

  form.getItems().forEach(function (item) {
    const title = item.getTitle();

    if (title === 'Pickup, delivery, or shipping?' || title === 'Delivery or shipping address (optional)') {
      form.deleteItem(item);
      removed++;
      return;
    }

    if (title === 'Preferred pickup or delivery time (optional)') {
      item.setTitle('Preferred pickup time (optional)');
      renamed++;
    }

    if (title === 'Date you need it') {
      item.asDateItem().setHelpText(
        'Please allow at least 48 hours. Pickup only, in Springfield, VA — we do not currently offer delivery or shipping.'
      );
    }
  });

  form.setConfirmationMessage(
    'Thank you! We got your order request and will reach out shortly to confirm your total and pickup details. ' +
    'Your order is confirmed once payment is received. ¡Qué rico!'
  );

  Logger.log('Removed ' + removed + ' item(s), renamed ' + renamed + ' item(s).');
  Logger.log('Form: ' + form.getEditUrl());
}
