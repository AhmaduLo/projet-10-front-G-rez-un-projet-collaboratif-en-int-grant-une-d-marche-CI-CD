import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {JokesService} from "./services/jokes.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import { Joke } from './model/joke.model';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let mockService: jasmine.SpyObj<JokesService>;

  // Blague simulée pour le test
  const mockJoke: Joke = {
    joke: 'Pourquoi Angular est nerveux ?',
    response: 'Parce qu’il a trop de composants.'
  };

  beforeEach(async () => {

    // Création d’un mock de service
    mockService = jasmine.createSpyObj('JokesService', ['joke$', 'getRandomJoke']);
    mockService.joke$.and.returnValue(of(mockJoke)); // Le service retournera une blague observable

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: JokesService, useValue: mockService }],
       // Ignore les composants Angular Material non déclarés (mat-toolbar, mat-card, etc.)
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Déclenche ngOnInit
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should call getRandomJoke() on init', () => {
    // Vérifie que la méthode a été appelée automatiquement au démarrage (ngOnInit)
    expect(mockService.getRandomJoke).toHaveBeenCalled();
  });

  it('should display the joke from the service', () => {
    // Récupère les paragraphes dans le template HTML
    const pElements = fixture.debugElement.queryAll(By.css('p'));
    expect(pElements.length).toBe(2);
    expect(pElements[0].nativeElement.textContent).toContain(mockJoke.joke);
    expect(pElements[1].nativeElement.textContent).toContain(mockJoke.response);
  });

  it('should call getRandomJoke() when button is clicked', () => {
    // Réinitialise les compteurs
    mockService.getRandomJoke.calls.reset();

    // Récupère le bouton
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();

    expect(mockService.getRandomJoke).toHaveBeenCalled();
  });
});
