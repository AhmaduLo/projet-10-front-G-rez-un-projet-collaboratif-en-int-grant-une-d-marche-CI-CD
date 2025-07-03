import { TestBed, waitForAsync } from '@angular/core/testing';
import { JokesService } from './jokes.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Joke } from '../model/joke.model';

describe('JokesService (integration)', () => {
  let service: JokesService;
  let httpMock: HttpTestingController;

  const mockJoke: Joke = {
    joke: 'Pourquoi JavaScript est triste ?',
    response: 'Parce qu’il ne sait pas typer.'
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JokesService]
    });

    service = TestBed.inject(JokesService);
    httpMock = TestBed.inject(HttpTestingController);
  }));

  afterEach(() => {
    httpMock.verify(); //  Vérifie qu’aucune requête ne reste en attente
  });

  it('should fetch a joke automatically at construction (ngInit)', (done) => {
    // Attente de la requête automatique déclenchée par le constructeur
    const req = httpMock.expectOne('api/joke');
    expect(req.request.method).toBe('GET');

    //  Simuler une réponse du backend
    req.flush(mockJoke);

    // Vérifie que la blague est bien transmise au subject
    service.joke$().subscribe(joke => {
      expect(joke).toEqual(mockJoke);
      done(); // Termine le test asynchrone
    });
  });
});
