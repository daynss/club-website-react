const events = [
  {
    id: "ux-design-mobile-apps",
    title: "UX Design in Mobile Applications",
    img: "https://cdn.pixabay.com/photo/2015/06/01/09/04/samsung-793043_1280.jpg",
    day: "Wednesday",
    date: "3 August 2025",
    time: "17:00",
    description:
      "Nam nec vulputate elit. Fusce malesuada egestas feugiat. Morbi tellus elit, ullamcorper quis turpis ut, posuere vulputate enim. Vestibulum egestas turpis ullamcorper ornare maximus. Donec interdum urna at accumsan semper. Duis nec leo quam. Maecenas dictum nunc at elit suscipit, ut malesuada enim viverra. Maecenas ultricies suscipit dolor nec gravida. Vivamus sed pellentesque dolor. Phasellus at ex consequat, tempor mauris vitae, congue velit.",
    artist: ["Michael Ronson"],
    entry: "free",
    category: "Wednesday Learning Session",
    category_id: "learning_session",
  },
  {
    id: "breakbeating-10",
    title: "Breakbeatin' vol.10",
    img: "https://cdn.pixabay.com/photo/2016/11/22/19/15/hand-1850120_1280.jpg",
    day: "Friday",
    date: "5 August 2025",
    time: "21:00",
    description:
      " Maecenas ultricies suscipit dolor nec gravida. Vivamus sed pellentesque dolor. Phasellus at ex consequat, tempor mauris vitae, congue velit. Fusce congue nibh tincidunt, tincidunt neque mattis, gravida mauris. Pellentesque feugiat nibh volutpat, fermentum felis non, tempus elit. Quisque tellus justo, suscipit eget sem id, feugiat finibus risus. In eget erat ac odio consequat lobortis vitae in leo.",
    artist: ["Potential", "Cardiac", "Arrest"],
    entry: 16,
    category: "Deserved Friday Party",
    category_id: "friday_party",
  },
  {
    id: "private-event-6-aug",
    title: "Private Event",
    img: "",
    day: "Saturday",
    date: "6 August 2025",
    time: null,
    description: null,
    artist: null,
    entry: null,
    category: "Private Event",
    category_id: "private_event",
  },
  {
    id: "photo-workshop",
    title: "Photography Workshop",
    img: "https://cdn.pixabay.com/photo/2014/07/31/22/50/photographer-407068_1280.jpg",
    day: "Wednesday",
    date: "10 August 2025",
    time: "17:00",
    description:
      "Duis nisi purus, dictum quis accumsan ut, aliquet nec sapien. Sed ac tortor vulputate, tristique diam ac, semper odio. Sed et neque et massa accumsan scelerisque varius nec lorem. Vivamus in enim sit amet est efficitur pulvinar. Pellentesque eu ante risus. Mauris quis rutrum orci, vitae vulputate erat. Duis scelerisque ante nulla, ut porta mauris vehicula nec.",
    artist: ["Michael Ronson"],
    entry: "free",
    category: "Wednesday Learning Session",
    category_id: "learning_session",
  },
  {
    id: "retro-party",
    title: "Retro Party",
    img: "https://cdn.pixabay.com/photo/2016/06/27/07/30/elvis-presley-1482026_1280.jpg",
    day: "Friday",
    date: "12 August 2025",
    time: "21:00",
    description:
      "Vestibulum gravida metus id dolor pulvinar pulvinar eu in diam. Nulla vehicula enim nisi, tristique dignissim odio tempor non. Suspendisse at mauris vestibulum, cursus libero non, laoreet purus. Nulla at tempus magna. Curabitur nec ipsum fermentum, maximus neque vel, molestie nulla. Maecenas tempor aliquam bibendum. ",
    artist: ["Just Married"],
    entry: 8,
    category: "Deserved Friday Party",
    category_id: "friday_party",
  },
  {
    id: "indie-blabber-18",
    title: "Indie Blabber vol.18",
    img: "https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_1280.jpg",
    day: "Saturday",
    date: "13 August 2025",
    time: "21:00",
    description:
      "Duis nisi purus, dictum quis accumsan ut, aliquet nec sapien. Sed ac tortor vulputate, tristique diam ac, semper odio. Sed et neque et massa accumsan scelerisque varius nec lorem. Vivamus in enim sit amet est efficitur pulvinar. Pellentesque eu ante risus. Mauris quis rutrum orci, vitae vulputate erat. Duis scelerisque ante nulla, ut porta mauris vehicula nec. ",
    artist: ["Alone on the Hill", "Youth Ferry", "The Predators"],
    entry: 12,
    category: "Saturday Night Concert",
    category_id: "saturday_concert",
  },
  {
    id: "how-to-survive-himalayas",
    title: "How to survive in the Himalayas",
    img: "https://cdn.pixabay.com/photo/2016/05/10/17/30/flags-1384193_1280.jpg",
    day: "Wednesday",
    date: "17 August 2025",
    time: "17:00",
    description:
      "Sed commodo, nunc id scelerisque aliquet, tortor nibh euismod est, ut eleifend purus tortor in felis. Proin facilisis at mauris vel sollicitudin. Nullam justo felis, tincidunt eget porttitor vitae, efficitur eu odio. Curabitur nec ultrices neque, vel rutrum diam. Suspendisse at orci nibh. Mauris rhoncus sodales risus, a elementum sapien dictum sit amet. Curabitur tristique mollis quam, id lacinia orci imperdiet tincidunt.",
    artist: ["Janine Brodin"],
    entry: "free",
    category: "Wednesday Learning Session",
    category_id: "learning_session",
  },
  {
    id: "private-event-19-aug",
    title: "Private Event",
    img: "",
    day: "Friday",
    date: "19 August 2025",
    time: null,
    description: null,
    artist: null,
    entry: null,
    category: "Private Event",
    category_id: "private_event",
  },
  {
    id: "rock-blabber-2",
    title: "Rock Blabber vol.2",
    img: "https://cdn.pixabay.com/photo/2016/11/19/13/57/drum-set-1839383_1280.jpg",
    day: "Saturday",
    date: "20 August 2025",
    time: "21:00",
    description:
      "Aliquam erat volutpat. Nullam lacinia libero tincidunt pulvinar cursus. Nulla porttitor dictum diam, vitae imperdiet libero. Fusce faucibus varius mauris, sed sollicitudin orci ultricies ac. Etiam nibh velit, hendrerit et vehicula eget, elementum quis ipsum. In tempus, sapien ut tincidunt ultricies, purus nisi ornare nulla, quis porttitor urna eros et libero. Donec sit amet porttitor elit. Mauris in vehicula neque, at accumsan magna.",
    artist: ["Galactic Guitars", "Spatial Drums"],
    entry: 14,
    category: "Saturday Night Concert",
    category_id: "saturday_concert",
  },
  {
    id: "lamest-poetry",
    title: "Lamest Poetry of All Times",
    img: "https://cdn.pixabay.com/photo/2015/04/13/14/06/poetry-720610_1280.jpg",
    day: "Wednesday",
    date: "24 August 2025",
    time: "17:00",
    description:
      "Donec vel velit ultricies turpis gravida volutpat. Aenean efficitur pretium mi ut aliquam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam eu feugiat odio. Morbi aliquam purus at pretium pulvinar. Donec vel dui efficitur, dignissim sapien sed, dapibus quam. Sed eu aliquam odio.",
    artist: ["Phillip Joaquin"],
    entry: "free",
    category: "Wednesday Learning Session",
    category_id: "learning_session",
  },
  {
    id: "yet-another-techno-party",
    title: "Yet Another Techno Party",
    img: "https://cdn.pixabay.com/photo/2015/02/09/00/02/party-629240_960_720.jpg",
    day: "Friday",
    date: "26 August 2025",
    time: "21:00",
    description:
      "Etiam efficitur suscipit velit at pulvinar. Morbi eget velit erat. Sed imperdiet tempus viverra. Praesent nibh tellus, hendrerit a elementum eu, faucibus sit amet magna. Ut et enim porttitor, dignissim nibh id, fermentum diam. Nullam eleifend ut nunc nec euismod. Proin arcu dolor, auctor sit amet quam vitae, commodo ultricies augue. Nullam quis egestas ipsum, nec egestas urna. Maecenas tempor imperdiet dolor id condimentum.",
    artist: ["Mr. Medical", "Side Effects"],
    entry: 12,
    category: "Deserved Friday Party",
    category_id: "friday_party",
  },
  {
    id: "private-event-27-aug",
    title: "Private Event",
    img: "",
    day: "Saturday",
    date: "27 August 2025",
    time: null,
    description: null,
    artist: null,
    entry: null,
    category: "Private Event",
    category_id: "private_event",
  },
];

export default events;
