import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroComponent } from '../hero/hero.component';
import { FooterComponent } from '../footer/footer.component';
import { MatIconModule } from '@angular/material/icon';

interface Project {
  title: string;
  description: string;
  image: string;
  demoUrl: string;
  githubUrl: string;
  technologies: string[];
}

interface TechStack {
  name: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, HeroComponent, FooterComponent, MatIconModule]
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
      title: 'E-commerce Platform',
      description: 'A modern e-commerce platform built with Angular and Node.js, featuring real-time inventory management and secure payment processing.',
      image: 'assets/images/projects/ecommerce.jpg',
      demoUrl: 'https://demo-ecommerce.com',
      githubUrl: 'https://github.com/your-username/ecommerce',
      technologies: ['Angular', 'Node.js', 'MongoDB', 'Stripe']
    },

  ];

  techStack: TechStack[] = [
    {
      name: 'Angular',
      description: 'Modern web framework for building dynamic single-page applications',
      icon: 'assets/images/tech/angular.png'
    },
    {
      name: 'TypeScript',
      description: 'Strongly typed programming language that builds on JavaScript',
      icon: 'assets/images/tech/typescript.png'
    },
    {
      name: 'SCSS',
      description: 'Advanced CSS preprocessor for better styling and maintainability',
      icon: 'assets/images/tech/scss.png'
    },
    {
      name: 'Node.js',
      description: 'JavaScript runtime for building scalable server-side applications',
      icon: 'assets/images/tech/nodejs.png'
    }
  ];
}
