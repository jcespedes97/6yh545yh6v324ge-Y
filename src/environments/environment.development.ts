export const environment = {
  ApiHost: 'http://localhost:3000',
  smartAuth: {
    clientId: 'fake_client_id',
    fhirScope:
      'launch profile openid online_access patient/Patient.read patient/Observation.read patient/MedicationRequest.*',
    redirectUri: 'http://localhost:4200',
  },
  smartLauncherUrls: {
    provider:
      'https://launch.smarthealthit.org/?launch_url=http%3A%2F%2Flocalhost%3A4200%2Flaunch%3FlaunchType%3Dprovider&launch=WzAsIiIsIiIsIkFVVE8iLDAsMCwwLCIiLCIiLCIiLCIiLCIiLCIiLCIiLDAsMSwiIl0',
    patient:
      'https://launch.smarthealthit.org/?launch_url=http%3A%2F%2Flocalhost%3A4200%2Flaunch%3FlaunchType%3Dpatient&launch=WzEsIiIsIiIsIkFVVE8iLDAsMCwwLCIiLCIiLCIiLCIiLCIiLCIiLCIiLDAsMSwiIl0',
  },
};
