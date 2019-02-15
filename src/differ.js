import _ from 'lodash';
import render from './render';

// export default (firstConfig, secondConfig) => {
//   const configKeys = _.union(Object.keys(firstConfig), Object.keys(secondConfig));
//   console.log('rest!');

//   const reducer = (acc, key) => {
//     if (_.has(firstConfig, key)) {
//       if (_.has(secondConfig, key)) {
//         if (firstConfig[key] !== secondConfig[key]) {
//           return [...acc,
//             `  + ${key}: ${secondConfig[key]}`,
//             `  - ${key}: ${firstConfig[key]}`];
//         }
//         return [...acc, `    ${key}: ${firstConfig[key]}`];
//       }
//       return [...acc, `  - ${key}: ${firstConfig[key]}`];
//     }
//     return [...acc, `  + ${key}: ${secondConfig[key]}`];
//   };
//   const diffResult = configKeys.reduce(reducer, []);

//   return `{\n${diffResult.join('\n')}\n}`;
// };


const buildASTNode = (firstConfigNode, secondConfigNode) => {
  const nodeKeys = _.union(Object.keys(firstConfigNode), Object.keys(secondConfigNode));

  const reducer = (acc, key) => {
    if (_.has(firstConfigNode, key)) {
      if (_.has(secondConfigNode, key)) {
        if (_.isObject(firstConfigNode[key])) {
          if (_.isObject(secondConfigNode[key])) {
            return [...acc, {
              key,
              status: 'unchanged',
              children: buildASTNode(firstConfigNode[key], secondConfigNode[key]),
            }];
          }
          return [...acc, {
            key,
            status: 'modified',
            currentValue: secondConfigNode[key],
            children: buildASTNode(firstConfigNode[key], secondConfigNode[key]),
          }];
        }
        if (firstConfigNode[key] !== secondConfigNode[key]) {
          if (_.isObject(secondConfigNode[key])) {
            return [...acc, {
              key,
              status: 'modified',
              previousValue: firstConfigNode[key],
              children: buildASTNode(secondConfigNode[key], secondConfigNode[key]),
            }];
          }
          return [...acc, {
            key,
            status: 'modified',
            currentValue: firstConfigNode[key],
            previousValue: secondConfigNode[key],
          }];
        }
        return [...acc, {
          key,
          status: 'unchanged',
          currentValue: firstConfigNode[key],
        }];
      }
      if (_.isObject(firstConfigNode[key])) {
        return [...acc, {
          key,
          status: 'removed',
          children: buildASTNode(firstConfigNode[key], firstConfigNode),
        }];
      }
      return [...acc, {
        key,
        status: 'removed',
        currentValue: firstConfigNode[key],
      }];
    }
    if (_.isObject(secondConfigNode[key])) {
      return [...acc, {
        key,
        status: 'added',
        children: buildASTNode(secondConfigNode[key], secondConfigNode[key]),
      }];
    }
    return [...acc, {
      key,
      status: 'added',
      currentValue: secondConfigNode[key],
    }];
  };

  return nodeKeys.reduce(reducer, []);
};

const differ = (firstConfig, secondConfig) => {
  const ast = buildASTNode(firstConfig, secondConfig);
  return render(ast);
};

export default differ;
