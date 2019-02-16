import renderJson from './json';
import renderPlain from './plain';

export default ast => ({
  renderAsJson: () => renderJson(ast),
  renderAsPlain: () => renderPlain(ast),
});
