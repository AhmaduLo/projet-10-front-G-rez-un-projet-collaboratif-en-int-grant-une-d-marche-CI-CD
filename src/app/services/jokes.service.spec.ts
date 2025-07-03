import { TestBed } from '@angular/core/testing';
import { JokesService } from './jokes.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Joke } from '../model/joke.model';

describe('JokesService', () => {
  let service: JokesService;
  let httpMock: HttpTestingController;

  const mockJoke: Joke = {
    joke: 'Pourquoi JavaScript est triste ?',
    response: 'Parce qu’il ne sait pas typer.'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JokesService]
    });

    service = TestBed.inject(JokesService);
    httpMock = TestBed.inject(HttpTestingController);

    //  Gérer la requête automatique déclenchée dans le constructeur
    const initialReq = httpMock.expectOne('api/joke');
    initialReq.flush({ joke: '', response: '' }); // Réponse vide pour ignorer
  });

  afterEach(() => {
    //  Vérifie qu'aucune requête n’est restée non traitée
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call GET /api/joke and emit value', () => {
    //  Lancer une requête manuelle
    service.getRandomJoke();

    //  Vérifie que la requête est correcte
    const req = httpMock.expectOne('api/joke');
    expect(req.request.method).toBe('GET');

    //  Simuler la réponse
    req.flush(mockJoke);

    //  Vérifie que le service émet bien la bonne valeur
    service.joke$().subscribe((result) => {
      expect(result).toEqual(mockJoke);
    });
  });
});
