angular.module('minerva.timeline', [])
  .filter('feedbackTypeClass', function () {
    return function (input) {
      switch (input) {
        case 'accompleshiment': return 'fa-trophy';
        case 'shout': return 'fa-bullhorn';
        case 'back-tap': return 'fa-star';
        case 'improvement': return 'fa-road';
        case 'screw-up': return 'fa-fire';
      }
    };
  })

  .filter('charactersLeft', function () {
    return function (input, maxCharacters) {
      var charactersLeftCount = !input ? maxCharacters : maxCharacters - input.length;

      return charactersLeftCount === 1 ?
        charactersLeftCount + " character left" :
        charactersLeftCount + " characters left";
    };
  })

  .controller('TimelineController', function () {
    this.feedbacks = [
      {
        sender: {
          id: "dborges",
          name: "Diego Borges"
        },
        receiver: {
          id: "drborges",
          name: "Diego da Rocha Borges"
        },
        content: "Diego helped on the ramp up of 5 team members on a scala techstack, which drastically improved the team turn around capabilities.",
        created_at: 1288323623006,
        type: "accompleshiment",
        visibility: "public",
        location: { latiture: 40.7597805, longitude: -73.9628991 },
        tags: ["scala", "goal"]
      },
      {
        receiver: {
          id: "dborges",
          name: "Diego Borges"
        },
        sender: {
          id: "drborges",
          name: "Diego da Rocha Borges"
        },
        content: "Diego helped on the ramp up of 5 team members on a scala techstack, which drastically improved the team turn around capabilities.",
        created_at: 1288323623006,
        type: "shout",
        visibility: "public",
        location: { latiture: 40.7597805, longitude: -73.9628991 },
        tags: ["scala", "goal"]
      },
      {
        sender: {
          id: "dborges",
          name: "Diego Borges"
        },
        receiver: {
          id: "drborges",
          name: "Diego da Rocha Borges"
        },
        content: "Diego helped on the ramp up of 5 team members on a scala techstack, which drastically improved the team turn around capabilities.",
        created_at: 1288323623006,
        type: "improvement",
        visibility: "public",
        location: { latiture: 40.7597805, longitude: -73.9628991 },
        tags: ["scala", "goal"]
      },
      {
        sender: {
          id: "dborges",
          name: "Diego Borges"
        },
        receiver: {
          id: "drborges",
          name: "Diego da Rocha Borges"
        },
        content: "Diego helped on the ramp up of 5 team members on a scala techstack, which drastically improved the team turn around capabilities.",
        created_at: 1288323623006,
        type: "screw-up",
        visibility: "public",
        location: { latiture: 40.7597805, longitude: -73.9628991 },
        tags: ["scala", "goal"]
      },
      {
        sender: {
          id: "dborges",
          name: "Diego Borges"
        },
        receiver: {
          id: "drborges",
          name: "Diego da Rocha Borges"
        },
        content: "Diego helped on the ramp up of 5 team members on a scala techstack, which drastically improved the team turn around capabilities.",
        created_at: 1288323623006,
        type: "back-tap",
        visibility: "public",
        location: { latiture: 40.7597805, longitude: -73.9628991 },
        tags: ["scala", "goal"]
      },
      {
        sender: {
          id: "dborges",
          name: "Diego Borges"
        },
        receiver: {
          id: "drborges",
          name: "Diego da Rocha Borges"
        },
        content: "Diego helped on the ramp up of 5 team members on a scala techstack, which drastically improved the team turn around capabilities.",
        created_at: 1288323623006,
        type: "accompleshiment",
        visibility: "public",
        location: { latiture: 40.7597805, longitude: -73.9628991 },
        tags: ["scala", "goal"]
      },
      {
        receiver: {
          id: "dborges",
          name: "Diego Borges"
        },
        sender: {
          id: "drborges",
          name: "Diego da Rocha Borges"
        },
        content: "Diego helped on the ramp up of 5 team members on a scala techstack, which drastically improved the team turn around capabilities.",
        created_at: 1288323623006,
        type: "shout",
        visibility: "public",
        location: { latiture: 40.7597805, longitude: -73.9628991 },
        tags: ["scala", "goal"]
      },
      {
        sender: {
          id: "dborges",
          name: "Diego Borges"
        },
        receiver: {
          id: "drborges",
          name: "Diego da Rocha Borges"
        },
        content: "Diego helped on the ramp up of 5 team members on a scala techstack, which drastically improved the team turn around capabilities.",
        created_at: 1288323623006,
        type: "improvement",
        visibility: "public",
        location: { latiture: 40.7597805, longitude: -73.9628991 },
        tags: ["scala", "goal"]
      },
      {
        sender: {
          id: "dborges",
          name: "Diego Borges"
        },
        receiver: {
          id: "drborges",
          name: "Diego da Rocha Borges"
        },
        content: "Diego helped on the ramp up of 5 team members on a scala techstack, which drastically improved the team turn around capabilities.",
        created_at: 1288323623006,
        type: "screw-up",
        visibility: "public",
        location: { latiture: 40.7597805, longitude: -73.9628991 },
        tags: ["scala", "goal"]
      },
      {
        sender: {
          id: "dborges",
          name: "Diego Borges"
        },
        receiver: {
          id: "drborges",
          name: "Diego da Rocha Borges"
        },
        content: "Diego helped on the ramp up of 5 team members on a scala techstack, which drastically improved the team turn around capabilities.",
        created_at: 1288323623006,
        type: "back-tap",
        visibility: "public",
        location: { latiture: 40.7597805, longitude: -73.9628991 },
        tags: ["scala", "goal"]
      }
    ];
  });