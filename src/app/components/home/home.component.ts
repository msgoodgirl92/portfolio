import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroComponent } from '../hero/hero.component';
import { FooterComponent } from '../footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

interface Project {
  title: string;
  description: string;
  image: string;
  demoUrl: string;
  githubUrl: string;
  technologies: string[];
}

interface BasicSkill {
  name: string;
  description: string;
  icon: string;
  isSvg?: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, HeroComponent, FooterComponent, MatIconModule, MatButtonModule]
})
export class HomeComponent {
  featuredProjects: Project[] = [
    {
      title: 'Banka aplikacija',
      description: 'A modern web application built with Angular, featuring API integration and responsive design.',
      image: 'assets/images/1.PNG',
      demoUrl: 'https://msgoodgirl92.github.io/angularapi',
      githubUrl: 'https://github.com/msgoodgirl92/angularapi',
      technologies: ['Angular', 'TypeScript', 'SCSS', 'Material UI', 'JSON', 'HTML', 'API']
    },
    {
      title: 'Weather App',
      description: 'A simple web application to display current weather information.',
      image: 'assets/images/weather2.jpg',
      demoUrl: 'https://msgoodgirl92.github.io/portfolio/js-games/weather.html',
      githubUrl: 'https://github.com/vas-username/weather-app',
      technologies: ['HTML', 'CSS', 'JavaScript', 'API']
    },
    {
      title: 'Tic-Tac-Toe Game',
      description: 'A modern and interactive Tic-Tac-Toe game with beautiful pink design, featuring AI opponent and score tracking.',
      image: 'assets/images/iks.PNG',
      demoUrl: 'https://msgoodgirl92.github.io/portfolio/js-games/iksoks.html',
      githubUrl: 'https://github.com/msgoodgirl92/portfolio',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Game Development']
    }
  ];

  basicSkills: BasicSkill[] = [
    {
      name: 'HTML5',
      description: 'Building the structure and content of web pages',
      icon: 'fab fa-html5'
    },
    {
      name: 'CSS3',
      description: 'Styling and designing beautiful user interfaces',
      icon: 'fab fa-css3-alt'
    },
    {
      name: 'JavaScript',
      description: 'Adding interactivity and dynamic functionality',
      icon: 'fab fa-js-square'
    },
    {
      name: 'Angular',
      description: 'Building modern single-page applications',
      icon: 'fab fa-angular'
    },
    {
      name: 'TypeScript',
      description: 'Writing more reliable and maintainable code',
      icon: 'fab fa-js-square'
    },
    {
      name: 'JSON',
      description: 'Working with data formats and API responses',
      icon: 'fas fa-code'
    },
    {
      name: 'API Integration',
      description: 'Connecting frontend with backend services',
      icon: 'fas fa-cloud'
    },
    {
      name: 'Git',
      description: 'Version control and collaboration',
      icon: 'fab fa-git-alt'
    },
    {
      name: 'Photoshop',
      description: 'Creating and editing graphics and designs',
      icon: 'assets/icons/photoshop.svg',
      isSvg: true
    },
    {
      name: 'Illustrator',
      description: 'Designing vector graphics and illustrations',
      icon: 'assets/icons/illustrator.svg',
      isSvg: true
    }
  ];

  downloadCV() {
    const link = document.createElement('a');
    link.href = 'assets/CVV.pdf';
    link.download = 'Desanka_CV.pdf';
    link.click();
  }
}
