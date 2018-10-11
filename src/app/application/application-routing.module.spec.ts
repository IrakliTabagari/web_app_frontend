import { ApplicationRoutingModule } from './application-routing.module';

describe('ApplicationRoutingModule', () => {
  let applicationRoutingModule: ApplicationRoutingModule;

  beforeEach(() => {
    applicationRoutingModule = new ApplicationRoutingModule();
  });

  it('should create an instance', () => {
    expect(applicationRoutingModule).toBeTruthy();
  });
});
