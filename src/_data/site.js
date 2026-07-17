export default {
  url: "https://tomaszkwietniewski.pl",
  autor: "Tomasz Kwietniewski",
  tagline: "Wiarygodne źródła, zero szumu",
  // Krótki title bez słowa "polityka" (decyzja 2026-07-16)
  title: "Tomasz Kwietniewski - wiarygodne źródła, zero szumu",
  description:
    "Bez mitów, bez szumu, z sensem. Inwestowanie pasywne, IKE i IKZE, technologie i tipy - dzielę się tym, co sam przeczytałem, sprawdziłem i przećwiczyłem.",
  // E-mail składany w JS na stronie Kontakt - nie trzymamy go w całości w HTML
  email: { user: "kontakt", domena: "tomaszkwietniewski.pl" },
  // Endpoint z dotychczasowego embedu MailerLite (ta sama lista subskrybentów)
  mailerlite: {
    action: "https://assets.mailerlite.com/jsonp/689059/forms/104814304741557524/subscribe",
  },
  buycoffee: "https://buycoffee.to/tomaszkwietniewski",
  github: "https://github.com/tomasz-kwietniewski",
  rok: new Date().getFullYear(),
  blogroll: [
    "atlasetf.pl",
    "atlaspasywnegoinwestora.pl",
    "inwestomat.eu",
    "jakoszczedzacpieniadze.pl",
    "marciniwuc.com",
    "stockbroker.pl",
    "systemtrader.pl",
  ],
};
