import Experience from './experience.model';

export default class Profile {
  constructor(
    public firstName: string,
    public lastName: string,
    public title: string,
    public experience: Experience[]
  ) {}
}

export const profiles = [
  new Profile('David', 'Rasch', 'Mr.', []),
  new Profile('Tommy', 'Hanks', 'Mr.', [
    new Experience('Developer', 'Developing things'),
  ]),
];
