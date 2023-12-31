import { Box, Container } from "@mui/material";
import { FC, useMemo, useState } from "react";
import { Category } from "../constants/enums";
import { FetchedElement, FilterByProp } from "../constants/interfaces";
import { SortByType } from "../constants/types";
import { useFetchData } from "../service/customHooks";
import CardComponent from "./CardComponent";
import FilterByHeader from "./FilterByHeader";
import Header from "./Header";

const MainApp: FC = () => {
  const categoryValues = Object.values(Category);
  const categoryValuesObject = categoryValues.map((e) => {
    return { category: e, selected: true };
  });

  const {fetchedData} = useFetchData();
  const [sortBy, setSortBy] = useState<SortByType>("");
  const [isAsc, setIsAsc] = useState<boolean>(true);
  const [filterBy, setFilterBy] = useState<FilterByProp[]>([
    ...categoryValuesObject,
  ]);

  const triggerCheckbox = (category: Category) => {
    const copy = [...filterBy];
    const selected = copy.map((e) => {
      if (e.category === category) {
        return { category, selected: !e.selected };
      } else {
        return e;
      }
    });
    setFilterBy(selected);
  };

  const filteredSortedData = useMemo(() => {
    const textSort = (a: string, b: string, isAsc: boolean) => {
      if (a < b) {
        return isAsc ? -1 : 1;
      }
      if (a > b) {
        return isAsc ? 1 : -1;
      }
      return 0;
    };

    const sortingFuction = (
      filtered: FetchedElement[],
      sortBy: SortByType,
      isAsc: boolean
    ) => {
      switch (sortBy) {
        case "title":
          filtered.sort(({ title: a }, { title: b }) => textSort(a, b, isAsc));
          break;
        case "category":
          filtered.sort(({ category: a }, { category: b }) =>
            textSort(a, b, isAsc)
          );
          break;
        case "date":
          filtered.sort(({ date: a }, { date: b }) =>
            isAsc
              ? new Date(a).getTime() - new Date(b).getTime()
              : new Date(b).getTime() - new Date(a).getTime()
          );
          break;
      }
      return filtered;
    };

    const data = [...fetchedData];
    const selectedCategories = filterBy.map(({ category, selected }) => {
      if (selected) {
        return category;
      }
    });
    const filtered = data.filter(({ category }) =>
      selectedCategories.includes(category)
    );
    const sorted = sortingFuction(filtered, sortBy, isAsc);

    return sorted;
  }, [fetchedData, sortBy, isAsc, filterBy]);

  return (
    <Container>
      <Box
        sx={{
          backgroundColor: "#e9f1f2",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Header
          sortBy={sortBy}
          setSortBy={setSortBy}
          isAsc={isAsc}
          setIsAsc={setIsAsc}
        />

        <FilterByHeader filterBy={filterBy} triggerCheckbox={triggerCheckbox} />

        {fetchedData.length > 0 && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {filteredSortedData.map((data) => (
              <CardComponent card={data} key={data.id} />
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
};

MainApp.displayName = "MainApp";

export default MainApp;
