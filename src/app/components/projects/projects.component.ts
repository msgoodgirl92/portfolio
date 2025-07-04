import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoLink: string;
  githubLink: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatTabsModule,
    MatIconModule
  ],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [
    {
      id: 1,
      title: 'Banka aplikacija',
      description: 'A modern web application built with Angular, featuring API integration and responsive design.',
      image: 'assets/images/1.PNG',
      technologies: ['Angular', 'TypeScript', 'SCSS', 'Material UI', 'JSON', 'HTML', 'API'],
      demoLink: 'https://msgoodgirl92.github.io/angularapi/',
      githubLink: 'https://github.com/msgoodgirl92/angularapi'
    },
    {
      id: 2,
      title: 'Weather App',
      description: 'A simple web application to display current weather information.',
      image: 'assets/images/weather2.jpg',
      technologies: ['HTML', 'CSS', 'JavaScript', 'API'],
      demoLink: 'https://msgoodgirl92.github.io/portfolio/js-games/weather.html',
      githubLink: 'https://github.com/vas-username/weather-app'
    },
    {
      id: 3,
      title: 'Tic-Tac-Toe Game',
      description: 'A modern and interactive Tic-Tac-Toe game with beautiful pink design, featuring AI opponent and score tracking.',
      image: 'assets/images/iks.PNG',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Game Development'],
      demoLink: 'https://msgoodgirl92.github.io/portfolio/js-games/iksoks.html',
      githubLink: 'https://github.com/msgoodgirl92/portfolio'
    },
    {
      id: 4,
      title: 'Kalkulator',
      description: 'Jednostavna web aplikacija za kalkulator.',
      image: 'assets/images/1112.PNG',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      demoLink: 'https://msgoodgirl92.github.io/portfolio/js-games/calculator.html',
      githubLink: 'https://github.com/vas-username/calculator-app'
    },
    {
      id: 5,
      title: 'E-commerce Platform',
      description: 'A full-featured e-commerce platform with user authentication, product management, and payment integration.',
      image: 'assets/images/projects/ecommerce.jpg',
      technologies: ['Angular', 'Node.js', 'MongoDB', 'Stripe'],
      demoLink: 'https://demo-ecommerce.com',
      githubLink: 'https://github.com/username/ecommerce'
    },
    {
      id: 6,
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates and team features.',
      image: 'assets/images/projects/taskmanager.jpg',
      technologies: ['Angular', 'Firebase', 'Material UI'],
      demoLink: 'https://demo-taskmanager.com',
      githubLink: 'https://github.com/username/taskmanager'
    },
    {
      id: 7,
      title: 'Portfolio Website',
      description: 'A modern portfolio website showcasing projects and skills with smooth animations.',
      image: 'assets/images/projects/portfolio.jpg',
      technologies: ['Angular', 'SCSS', 'GSAP'],
      demoLink: 'https://portfolio-demo.com',
      githubLink: 'https://github.com/username/portfolio'
    }
  ];

  filteredProjects: Project[] = [];
  selectedTechnologies: string[] = [];
  allTechnologies: string[] = [];

  ngOnInit() {
    this.filteredProjects = [...this.projects];
    this.allTechnologies = [...new Set(this.projects.flatMap(p => p.technologies))];
  }

  toggleTechnology(tech: string) {
    const index = this.selectedTechnologies.indexOf(tech);
    if (index === -1) {
      this.selectedTechnologies.push(tech);
    } else {
      this.selectedTechnologies.splice(index, 1);
    }
    this.filterProjects();
  }

  filterProjects() {
    if (this.selectedTechnologies.length === 0) {
      this.filteredProjects = [...this.projects];
    } else {
      this.filteredProjects = this.projects.filter(project =>
        this.selectedTechnologies.every(tech => project.technologies.includes(tech))
      );
    }
  }

  isTechnologySelected(tech: string): boolean {
    return this.selectedTechnologies.includes(tech);
  }

  openDemo(url: string) {
    if (url && url !== '#') {
      window.open(url, '_blank');
    }
  }

  openGithub(url: string) {
    if (url && url !== '#') {
      window.open(url, '_blank');
    }
  }

  get featuredProjects() {
    return this.projects.slice(0, 3);
  }
}
