import {Component, OnInit} from '@angular/core';
import {Question} from '../model/Question';
import {QuestionService} from '../../services/question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  questions: Question[] = [];
  activeQuestion: Question = null;

  constructor(private questionService: QuestionService) {
  }

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe(items => {
      items.forEach(item => {
        this.questions.push(new Question(item.id, item.question, item.answer));
      });
    });
  }

  toggleQuestion(question: Question): void {
    this.activeQuestion = question;
    this.questions.forEach(q => {
      if (q != question) {
        q.answerVisible = false;
      }
    });
    question.answerVisible = !question.answerVisible;
  }
}
