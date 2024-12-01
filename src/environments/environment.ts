export const environment = {
  ApiHost: 'http://ec2-100-27-208-246.compute-1.amazonaws.com',
  smartAuth: {
    clientId: 'someId',
    fhirScope: 'launch profile openid online_access patient/Patient.read',
    redirectUri: 'http://ec2-18-208-222-109.compute-1.amazonaws.com',
  },
  smartLauncherUrls: {
    provider:
      'https://launch.smarthealthit.org/?launch_url=http%3A%2F%2Fec2-18-208-222-109.compute-1.amazonaws.com%2Flaunch%3FlaunchType%3Dprovider&launch=WzEsIiIsIiIsIkFVVE8iLDAsMCwwLCIiLCIiLCIiLCIiLCIiLCIiLCIiLDAsMSwiIl0',
    patient:
      'https://launch.smarthealthit.org/?launch_url=http%3A%2F%2Fec2-18-208-222-109.compute-1.amazonaws.com%2Flaunch%3FlaunchType%3Dpatient&launch=WzEsIiIsIiIsIkFVVE8iLDAsMCwwLCIiLCIiLCIiLCIiLCIiLCIiLCIiLDAsMSwiIl0',
  },
};
