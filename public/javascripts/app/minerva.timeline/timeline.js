angular.module('minerva.timeline', [])

  .directive('timeline', function () {
    return {
      scope: {
        activity: '=activity'
      },
      restrict: 'E',
      templateUrl: 'templates/timeline.html'
    };
  })

  .filter('feedbackTypeClass', function () {
    return function (feedbackType) {
      switch (feedbackType) {
        case 'achievement': return 'fa-trophy';
        case 'shout': return 'fa-bullhorn';
        case 'back-tap': return 'fa-star';
        case 'improvement': return 'fa-road';
        case 'screw-up': return 'fa-fire';
      }
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
        type: "achievement",
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
        type: "achievement",
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