// process.env.DEBUG = 'actions-on-google:*';
const { DialogflowApp } = require('actions-on-google');

module.exports = (request, response, next) => {
  const app = new DialogflowApp({ request, response });
  // console.log('Request headers: ' + JSON.stringify(request.headers));
  // console.log('Request body: ' + JSON.stringify(request.body));
  // Dialogflow Actions
  const TOUR_SURVEY = 'input.tour';
  const TOUR_SURVEY_CONFIRM = 'input.tour.confirm';
  const TOUR_SURVEY_MODIFY_ALL = 'input.tour.modify.all';
  const TOUR_SURVEY_MODIFY_DATE = 'input.tour.modify.date';
  const TOUR_SURVEY_MODIFY_TIME = 'input.tour.modify.time';
  const TOUR_SURVEY_MODIFY_VEHICLE = 'input.tour.modify.vehicle';
  const TOUR_SURVEY_MODIFY_ORIGIN = 'input.tour.modify.origin';
  const TOUR_SURVEY_MODIFY_DESTINATION = 'input.tour.modify.destination';

  // Dialogflow Action Args
  const DATE_ARG = 'date';
  const TIME_ARG = 'time';
  const VEHICLE_ARG = 'vehicle';
  const VEHICLE_PLATFORM_ARG = 'vehiclePlatform';
  const GEO_ORIGIN_CITY_ARG = 'originCity';
  const GEO_DESTINATION_CITY_ARG = 'destinationCity';

  // Dialogflow Context
  // const OUT_SURVEY = 'tourSurvey'.toLowerCase();
  const OUT_SURVEY_DECISION = 'tourDecision'.toLowerCase();

  function tourSurveyIntent(app) {
    console.log(app.getIntent());
    const parameters = {};
    parameters[GEO_ORIGIN_CITY_ARG] = app.getArgument(GEO_ORIGIN_CITY_ARG);
    parameters[GEO_DESTINATION_CITY_ARG] = app.getArgument(GEO_DESTINATION_CITY_ARG);
    parameters[DATE_ARG] = app.getArgument(DATE_ARG);
    parameters[TIME_ARG] = app.getArgument(TIME_ARG);
    parameters[VEHICLE_ARG] = app.getArgument(VEHICLE_ARG);
    parameters[VEHICLE_PLATFORM_ARG] = app.getArgument(VEHICLE_PLATFORM_ARG);
    app.setContext(OUT_SURVEY_DECISION, 5, parameters);
  }

  function tourSurveyConfirmIntent(app) {
    console.log(app.getIntent());
    const output = {};
    output[GEO_ORIGIN_CITY_ARG] = app.getContextArgument(OUT_SURVEY_DECISION, GEO_ORIGIN_CITY_ARG);
    output[GEO_DESTINATION_CITY_ARG] = app.getContextArgument(OUT_SURVEY_DECISION, GEO_DESTINATION_CITY_ARG);
    output[DATE_ARG] = app.getContextArgument(OUT_SURVEY_DECISION, DATE_ARG);
    output[TIME_ARG] = app.getContextArgument(OUT_SURVEY_DECISION, TIME_ARG);
    output[VEHICLE_ARG] = app.getContextArgument(OUT_SURVEY_DECISION, VEHICLE_ARG);
    output[VEHICLE_PLATFORM_ARG] = app.getContextArgument(OUT_SURVEY_DECISION, VEHICLE_PLATFORM_ARG);
    console.log(`TourData: ${JSON.stringify(output)}`);
  }

  function tourSurveyModifyDateIntent(app) {
    console.log(app.getIntent());
    const tourStartDate = app.getContextArgument(OUT_SURVEY_DECISION, DATE_ARG);
    console.log('Datum: ' + tourStartDate.value);
  }

  function tourSurveyModifyTimeIntent(app) {
    console.log(app.getIntent());
    const tourStartTime = app.getContextArgument(OUT_SURVEY_DECISION, TIME_ARG);
    console.log('Zeit: ' + tourStartTime.value);
  }

  function tourSurveyModifyOriginIntent(app) {
    console.log(app.getIntent());
    const tourOrigin = app.getContextArgument(OUT_SURVEY_DECISION, GEO_ORIGIN_CITY_ARG);
    console.log('Beladeort: ' + tourOrigin.value);
  }

  function tourSurveyModifyDestinationIntent(app) {
    console.log(app.getIntent());
    const tourDestination = app.getContextArgument(OUT_SURVEY_DECISION, GEO_DESTINATION_CITY_ARG);
    console.log('Entladeort: ' + tourDestination.value);
  }

  function tourSurveyModifyVehicleIntent(app) {
    console.log(app.getIntent());
    const tourVehicle = app.getContextArgument(OUT_SURVEY_DECISION, VEHICLE_ARG);
    const tourVehiclePlatform = app.getContextArgument(OUT_SURVEY_DECISION, VEHICLE_PLATFORM_ARG);
    console.log('Fahrzeug: ' + tourVehicle.value);
    console.log('FahrzeugPlattform: ' + tourVehiclePlatform.value);
  }

  function tourSurveyModifyAllIntent(app) {
    console.log(app.getIntent());
    const output = {};
    const newOrigin = app.getArgument('newOrigin');
    output[GEO_ORIGIN_CITY_ARG] = (newOrigin) ? newOrigin : app.getContextArgument(OUT_SURVEY_DECISION, GEO_ORIGIN_CITY_ARG);
    const newDestination = app.getArgument('newDestination');
    output[GEO_DESTINATION_CITY_ARG] = (newDestination) ? newDestination : app.getContextArgument(OUT_SURVEY_DECISION, GEO_DESTINATION_CITY_ARG);
    const newStartDate= app.getArgument('newDate');
    output[DATE_ARG] = (newStartDate) ? newStartDate : app.getContextArgument(OUT_SURVEY_DECISION, DATE_ARG);
    const newStartTime = app.getArgument('newTime');
    output[TIME_ARG] = (newStartTime) ? newStartTime : app.getContextArgument(OUT_SURVEY_DECISION, TIME_ARG);
    const newVehicle = app.getArgument('newVehicle');
    output[VEHICLE_ARG] = (newVehicle) ? newVehicle : app.getContextArgument(OUT_SURVEY_DECISION, VEHICLE_ARG);
    const newVehiclePlatform = app.getArgument('newVehiclePlatform');
    output[VEHICLE_PLATFORM_ARG] = (newVehiclePlatform) ? newVehiclePlatform : app.getContextArgument(OUT_SURVEY_DECISION, VEHICLE_PLATFORM_ARG);
    console.log(`newTourData: ${JSON.stringify(output)}`);
    app.setContext(OUT_SURVEY_DECISION, 5, output);
  }

  const actionMap = new Map();
  actionMap.set(TOUR_SURVEY, tourSurveyIntent);
  actionMap.set(TOUR_SURVEY_CONFIRM, tourSurveyConfirmIntent);
  actionMap.set(TOUR_SURVEY_MODIFY_DATE, tourSurveyModifyDateIntent);
  actionMap.set(TOUR_SURVEY_MODIFY_TIME, tourSurveyModifyTimeIntent);
  actionMap.set(TOUR_SURVEY_MODIFY_ORIGIN, tourSurveyModifyOriginIntent);
  actionMap.set(TOUR_SURVEY_MODIFY_DESTINATION, tourSurveyModifyDestinationIntent);
  actionMap.set(TOUR_SURVEY_MODIFY_VEHICLE, tourSurveyModifyVehicleIntent);
  actionMap.set(TOUR_SURVEY_MODIFY_ALL, tourSurveyModifyAllIntent);
  app.handleRequest(actionMap);
  next();
};
