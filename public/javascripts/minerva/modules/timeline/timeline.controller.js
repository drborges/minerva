angular.module('minerva.timeline')

  .controller('TimelineCtrl', function () {
    this.post = function (feedback) {
      this.feedbacks.unshift(feedback);
    };

    this.feedbacks = [
      {
        sender: {
          id: 'dborges',
          name: 'Diego Borges'
        },
        receiver: {
          id: 'drborges',
          name: 'Diego da Rocha Borges'
        },
        content: 'Diego helped on the ramp up of 5 team members on a scala techstack, which drastically improved the team turn around capabilities.',
        createdAt: 1288323623006,
        type: 'achievement',
        visibility: 'public',
        location: { latiture: 40.7597805, longitude: -73.9628991 },
        tags: ['achievement', 'scala']
      },
      {
        receiver: {
          id: 'dborges',
          name: 'Diego Borges'
        },
        sender: {
          id: 'drborges',
          name: 'Diego da Rocha Borges'
        },
        content: 'Diego helped on the ramp up of 5 team members on a scala techstack, which drastically improved the team turn around capabilities.',
        createdAt: 1288323623006,
        type: 'shout',
        visibility: 'public',
        location: { latiture: 40.7597805, longitude: -73.9628991 },
        tags: ['shout', 'devOps', 'CD', 'chef']
      },
      {
        sender: {
          id: 'dborges',
          name: 'Diego Borges'
        },
        receiver: {
          id: 'drborges',
          name: 'Diego da Rocha Borges'
        },
        content: 'Diego helped on the ramp up of 5 team members on a scala techstack, which drastically improved the team turn around capabilities.',
        createdAt: 1288323623006,
        type: 'improvement',
        visibility: 'public',
        location: { latiture: 40.7597805, longitude: -73.9628991 },
        tags: ['improvement', 'javascript']
      },
      {
        sender: {
          id: 'dborges',
          name: 'Diego Borges'
        },
        receiver: {
          id: 'drborges',
          name: 'Diego da Rocha Borges'
        },
        content: 'Diego helped on the ramp up of 5 team members on a scala techstack, which drastically improved the team turn around capabilities.',
        createdAt: 1288323623006,
        type: 'screw-up',
        visibility: 'public',
        location: { latiture: 40.7597805, longitude: -73.9628991 },
        tags: ['screw-up']
      },
      {
        sender: {
          id: 'dborges',
          name: 'Diego Borges'
        },
        receiver: {
          id: 'drborges',
          name: 'Diego da Rocha Borges'
        },
        content: 'Diego helped on the ramp up of 5 team members on a scala techstack, which drastically improved the team turn around capabilities.',
        createdAt: 1288323623006,
        type: 'back-tap',
        visibility: 'public',
        location: { latiture: 40.7597805, longitude: -73.9628991 },
        tags: ['back-tap', 'scala', 'goal']
      },
      {
        sender: {
          id: 'dborges',
          name: 'Diego Borges'
        },
        receiver: {
          id: 'drborges',
          name: 'Diego da Rocha Borges'
        },
        content: 'Diego helped on the ramp up of 5 team members on a scala techstack, which drastically improved the team turn around capabilities.',
        createdAt: 1288323623006,
        type: 'achievement',
        visibility: 'public',
        location: { latiture: 40.7597805, longitude: -73.9628991 },
        tags: ['achievement', 'scala', 'goal']
      },
      {
        receiver: {
          id: 'dborges',
          name: 'Diego Borges'
        },
        sender: {
          id: 'drborges',
          name: 'Diego da Rocha Borges'
        },
        content: 'Diego helped on the ramp up of 5 team members on a scala techstack, which drastically improved the team turn around capabilities.',
        createdAt: 1288323623006,
        type: 'shout',
        visibility: 'public',
        location: { latiture: 40.7597805, longitude: -73.9628991 },
        tags: ['shout', 'scala', 'goal']
      },
      {
        sender: {
          id: 'dborges',
          name: 'Diego Borges'
        },
        receiver: {
          id: 'drborges',
          name: 'Diego da Rocha Borges'
        },
        content: 'Diego helped on the ramp up of 5 team members on a scala techstack, which drastically improved the team turn around capabilities.',
        createdAt: 1288323623006,
        type: 'improvement',
        visibility: 'public',
        location: { latiture: 40.7597805, longitude: -73.9628991 },
        tags: ['improvement', 'scala', 'goal']
      },
      {
        sender: {
          id: 'dborges',
          name: 'Diego Borges'
        },
        receiver: {
          id: 'drborges',
          name: 'Diego da Rocha Borges'
        },
        content: 'Diego helped on the ramp up of 5 team members on a scala techstack, which drastically improved the team turn around capabilities.',
        createdAt: 1288323623006,
        type: 'screw-up',
        visibility: 'public',
        location: { latiture: 40.7597805, longitude: -73.9628991 },
        tags: ['screw-up', 'scala', 'goal']
      },
      {
        sender: {
          id: 'dborges',
          name: 'Diego Borges'
        },
        receiver: {
          id: 'drborges',
          name: 'Diego da Rocha Borges'
        },
        content: 'Diego helped on the ramp up of 5 team members on a scala techstack, which drastically improved the team turn around capabilities.',
        createdAt: 1288323623006,
        type: 'back-tap',
        visibility: 'public',
        location: { latiture: 40.7597805, longitude: -73.9628991 },
        tags: ['back-tap', 'scala', 'goal']
      }
    ];
  });