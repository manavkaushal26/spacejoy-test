
import { useState } from 'react'
import { Tab } from '@headlessui/react'

export function MetaTable({headers, values}) {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
              <tr>
                {headers.map((header, idx) => (
                  <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  key={idx}
                >
                  {header}
                </th>
                ))}
                
                </tr>
              </thead>
              <tbody>
                {values.map((value, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    {value.map((str, strIdx) => (
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" key={strIdx}>{str}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export const MetaDataTable = ({values}) => {
  return (
    <div>
      {values !== null && values.length > 0
        ? values.map((item, itemIndex) => (
            <li key={itemIndex} className="my-5">
              {"dt" in item ? <strong>{item.dt}: </strong> : null}
              {item.dd}
            </li>
          ))
        : null}
    </div>
  );
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function MetaTab({values}) {
  let [categories] = useState(values)

  return (
    <div className="w-full max-w-md px-2 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
          {categories.map((category, idx) => (
            <Tab
              key={idx}
              className={({ selected }) =>
                classNames(
                  'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                  'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {category.name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(values).map((value, idx) => (
            <Tab.Panel
              key={idx}
              className='bg-white rounded-xl p-3'
            >
              {renderMetaSection(value)}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export const renderMetaSection = (description) => {
  const { type = '' } = description;
  switch (type) {
    case 'string':
      return (
        <ul role="list">
          <li>{description?.value}</li>
        </ul>
      );
    case 'stringArray':
      return (
        <ul role="list">
          {description?.title && description?.value?.length ? <h4>{description?.title}</h4> : null}
          {description?.value?.map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
      );
    case 'tab':
      return <MetaTab values={description.value} />;
    case 'table':
      return <MetaTable headers={description.header} values={description.value} />;
    case 'dataTable':
      return <MetaDataTable values={description.value} />;
    default:
      return null;
  }
};

// export default renderMetaSection;