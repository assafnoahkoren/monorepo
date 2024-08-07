import {ScenarioGeneratorService} from "./scenario-generator/scenario-generator.service";

const scenarioGenerator = new ScenarioGeneratorService();
const scenario = scenarioGenerator.generateScenario(10, 10, 10);

