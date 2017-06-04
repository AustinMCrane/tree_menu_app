import { 
  dataAdapter,
  rawChildToChild,
  selectedNodes
} from '../utils';

describe('dataAdapter', () => {
  it('should return menu data structure', () => {
    const input = require('../../../datasets/games.json').menuItems;
    const output = dataAdapter(input);

    expect(output.length).toEqual(input.length);
  });
});
describe('rawChildToChild', () => {
  it('should return child data structure', () => {
    const input = require('../../../datasets/games.json').menuItems;
    let firstChild = input[0];

    expect(rawChildToChild(firstChild).title).toEqual(firstChild.checkDesc);
  });
});

describe('selectedNodes', () => {
  it('should find no selected nodes', () => {
    const input = require('../../../datasets/games.json').menuItems;
    const adaptedData = dataAdapter(input);

    expect(selectedNodes([], adaptedData).length).toEqual(0);
  });
  it('should find some selected nodes', () => {
    const input = require('../../../datasets/games.json').menuItems;
    const adaptedData = dataAdapter(input);
    const selectedIds = [203];

    expect(selectedNodes(selectedIds, adaptedData).length).toEqual(1);
  });
});
