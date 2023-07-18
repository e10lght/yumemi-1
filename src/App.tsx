import { PrefectureCheckboxes } from "./components/PrefectureCheckboxes";
import { DemographicsRadioButtons } from "./components/DemographicsRadioButtons";
import { Title } from "./components/Title";
import { Graph } from "./components/Graph";
import { usePopulationData } from "./hooks/usePopulationData";

function App() {
  const {
    prefectures,
    categories,
    targets,
    selectedCategoryIndex,
    yearList,
    isDrawing,
    onChangeDemographics,
    onChangeCategory
  } = usePopulationData();

  return (
    <div className="App">
      <Title />
      <PrefectureCheckboxes
        prefectures={prefectures}
        onChange={onChangeDemographics}
        isDrawing={isDrawing}
      />
      {categories && (
        <DemographicsRadioButtons
          categories={categories}
          selectedCategoryIndex={selectedCategoryIndex}
          onChange={onChangeCategory}
        />
      )}
      {categories && targets && (
        <Graph
          yearList={yearList}
          categories={categories}
          selectedCategoryIndex={selectedCategoryIndex}
          targets={targets}
          prefectures={prefectures}
        />
      )}
    </div>
  );
}

export default App;
