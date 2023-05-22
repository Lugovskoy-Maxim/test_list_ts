import React from 'react';
import { useLocation, useNavigate  } from 'react-router-dom';
import queryString from 'query-string';
import { Row } from '../types/types';

// Определение типа пропсов компонента, вынес в отдельный файл
interface ListPageProps {
  rows: Row[];
}

const ListPage: React.FC<ListPageProps> = ({ rows }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = queryString.parse(location.search); // Разбор строки запроса

  const tabs = ['income', 'outcome', 'loan', 'investment']; // Список доступных вкладок
  const selectedTab = queryParams.tab ? parseInt(queryParams.tab as string) > (tabs.length - 1) ? 0 : parseInt(queryParams.tab as string) : 0; // Определение вкладки на основе параметра "tab" из строки запроса если не указана или больше длины доступных вкладок то 0;

  const handleTabChange = (tabIndex: number) => { // изменение выбранной вкладки
    const newQueryParams = { ...queryParams, tab: tabIndex.toString() }; // Обновление параметра tab в объекте параметров строки запроса
    const search = queryString.stringify(newQueryParams);   // Преобразование объекта в строку запроса
    navigate(`/navigator?${search}`); // Переход по маршруту
  };

  const filteredRows = rows.filter((row) => row.type === tabs[selectedTab]); // Фильтрация строк по выбранной вкладке

  return (
    <div className="px-2 py-2 w-max mx-auto flex flex-col justify-center rounded-md border-2 border-black">
      <ul className="flex mx-auto w-96">
        {tabs.map((tab, index) => (
          <li
            key={index}
            className={`px-4 py-2 cursor-pointer rounded-t-lg border-r-2 border-t-2 border-l-2 border-black ${
              index === selectedTab ? 'bg-gray-200 text-black' : 'bg-white text-black'
            }`}
            onClick={() => handleTabChange(index)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </li>
        ))}
      </ul>

      <table className="table-fixed mx-auto mt-4 w-96 justify-center">
        <thead>
          <tr className="border-b-2">
            <th className="px-2 py-1">Name</th>
            <th className="px-2 py-1">Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredRows.map((row) => (
            <tr className="border-b-2"  title={`${JSON.stringify(row)}`} key={row._id}>
              <td className="px-4 py-2">{`${row.name.first} ${row.name.last}`}</td>
              <td className="px-4 py-2">{row.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListPage;