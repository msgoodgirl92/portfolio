import { Component, OnInit, HostListener } from '@angular/core';
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

interface Website {
  id: number;
  title: string;
  description: string;
  image: string;
  url: string;
}

interface Logo {
  id: number;
  image: string;
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
      title: 'Loan Calculator',
      description: 'Web aplikacija za izračunavanje kredita i mesečnih rata.',
      image: 'assets/images/loan.PNG',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      demoLink: 'https://msgoodgirl92.github.io/portfolio/js-games/loan.html',
      githubLink: 'https://github.com/msgoodgirl92/portfolio'
    },
    {
      id: 6,
      title: 'Hangman Game',
      description: 'Klasična Hangman igra sa različitim kategorijama reči (Premier League timovi, filmovi, gradovi) i interaktivnim crtanjem. Igra uključuje overlay sa rešenjem na kraju igre.',
      image: 'assets/images/hangman.PNG',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Canvas API', 'Game Development'],
      demoLink: 'https://msgoodgirl92.github.io/portfolio/js-games/index2.html',
      githubLink: 'https://github.com/msgoodgirl92/portfolio'
    }
  ];

  websites: Website[] = [
    {
      id: 1,
      title: 'Website 1',
      description: 'Opis prvog website-a',
      image: 'assets/images/334.png',
      url: 'https://example1.com'
    },
    {
      id: 2,
      title: 'Website 2',
      description: 'Opis drugog website-a',
      image: 'assets/images/22.png',
      url: 'https://example2.com'
    },
    {
      id: 3,
      title: 'Website 3',
      description: 'Opis trećeg website-a',
      image: 'assets/images/334.png',
      url: 'https://example3.com'
    }
  ];

  logos: Logo[] = [
    {
      id: 1,
      image: 'assets/logos/soma.png'
    },
    {
      id: 2,
      image: 'assets/logos/red-head.jpg'
    },
    {
      id: 3,
      image: 'assets/logos/kiko1.jpg'
    },
    {
      id: 4,
      image: 'assets/logos/kiko.jpg'
    },
    {
      id: 5,
      image: 'assets/logos/ffgf.png'
    },
    {
      id: 6,
      image: 'assets/logos/fdfdfd.png'
    },
    {
      id: 7,
      image: 'assets/logos/DSDS.png'
    },
    {
      id: 8,
      image: 'assets/logos/555.png'
    },
    {
      id: 9,
      image: 'assets/logos/121.png'
    }
  ];

  filteredProjects: Project[] = [];
  selectedTechnologies: string[] = [];
  allTechnologies: string[] = [];

  // Websites inline preview state
  activeWebsiteImage: string | null = null;

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

  openWebsite(url: string) {
    if (url && url !== '#') {
      window.open(url, '_blank');
    }
  }

  // Show website screenshot inline below the grid
  openWebsiteInTab(imageUrl: string) {
    if (imageUrl) {
      this.activeWebsiteImage = imageUrl;
      document.body.style.overflow = 'hidden';
    }
  }

  closeWebsiteTab() {
    this.activeWebsiteImage = null;
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.activeWebsiteImage) {
      this.closeWebsiteTab();
    }
  }


  get featuredProjects() {
    return this.projects.slice(0, 6);
  }
}
