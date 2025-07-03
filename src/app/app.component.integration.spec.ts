import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { JokesService } from './services/jokes.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Joke } from './model/joke.model';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent (Integration)', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let httpMock: HttpTestingController;

  const mockJoke: Joke = {
    joke: 'Pourquoi TypeScript est calme ?',
    response: 'Parce qu’il est typé.'
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule],
      providers: [JokesService],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges(); // ngOnInit() est appelé ici
  });

 it('should display a joke from the real service', () => {
  // Récupère toutes les requêtes vers l'API
  const requests = httpMock.match('api/joke');
  expect(requests.length).toBe(2); // 💡 Il y en a deux

  // Répond à chaque requête avec la même blague simulée
  for (const req of requests) {
    expect(req.request.method).toBe('GET');
    req.flush(mockJoke);
  }

  fixture.detectChanges(); // met à jour le DOM après les réponses

  const paragraphs = fixture.debugElement.queryAll(By.css('p'));
  expect(paragraphs.length).toBe(2);
  expect(paragraphs[0].nativeElement.textContent).toContain(mockJoke.joke);
  expect(paragraphs[1].nativeElement.textContent).toContain(mockJoke.response);
});

  afterEach(() => {
    httpMock.verify(); // Vérifie qu'aucune requête inattendue n'est en attente
  });
});
