export const environment = {
  ApiHost: 'http://ec2-3-142-142-75.us-east-2.compute.amazonaws.com',
  smartAuth: {
    clientId: 'someId',
    fhirScope: 'launch profile openid online_access patient/Patient.read',
    redirectUri: 'http://ec2-3-132-214-188.us-east-2.compute.amazonaws.com',
  },
  smartLauncherUrls: {
    provider:
      'https://launch.smarthealthit.org/?launch_url=http%3A%2F%2Fec2-3-132-214-188.us-east-2.compute.amazonaws.com%2Flaunch%3FlaunchType%3Dprovider&launch=WzEsIiIsIiIsIkFVVE8iLDAsMCwwLCIiLCIiLCIiLCIiLCIiLCIiLCIiLDAsMSwiIl0',
    patient:
      'https://launch.smarthealthit.org/?launch_url=http%3A%2F%2Fec2-3-132-214-188.us-east-2.compute.amazonaws.com%2Flaunch%3FlaunchType%3Dpatient&launch=WzEsIiIsIiIsIkFVVE8iLDAsMCwwLCIiLCIiLCIiLCIiLCIiLCIiLCIiLDAsMSwiIl0',
  },
};
