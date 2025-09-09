import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools';
}



@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule]
})
export class AboutComponent {
  skills: Skill[] = [
    { name: 'Angular', level: 90, category: 'frontend' },
    { name: 'TypeScript', level: 85, category: 'frontend' },
    { name: 'HTML/CSS', level: 95, category: 'frontend' },
    { name: 'JavaScript', level: 90, category: 'frontend' },
    { name: 'Node.js', level: 75, category: 'backend' },
    { name: 'MongoDB', level: 70, category: 'backend' },
    { name: 'Git', level: 85, category: 'tools' },
    { name: 'Figma', level: 80, category: 'tools' }
  ];



  get frontendSkills() {
    return this.skills.filter(skill => skill.category === 'frontend');
  }

  get backendSkills() {
    return this.skills.filter(skill => skill.category === 'backend');
  }

  get toolSkills() {
    return this.skills.filter(skill => skill.category === 'tools');
  }
}
