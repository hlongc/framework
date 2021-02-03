import Tree from './tree';
import '../../style/tree.scss';

Tree.install = app => {
  app.component(Tree.name, Tree);
};

export default Tree;
