"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const prosemirror_utils_1 = require("prosemirror-utils");
const KnowtCommandMenu_1 = __importDefault(require("./KnowtCommandMenu"));
const BlockMenuItem_1 = __importDefault(require("./BlockMenuItem"));
const BlockGroupMenuItem_1 = __importDefault(require("./BlockGroupMenuItem"));
const block_1 = require("../menus/block");
class BlockMenu extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.clearSearch = () => {
            const { state, dispatch } = this.props.view;
            const parent = prosemirror_utils_1.findParentNode((node) => !!node)(state.selection);
            if (parent) {
                dispatch(state.tr.insertText("", parent.pos, state.selection.to));
            }
        };
    }
    get groupedItems() {
        return block_1.groupedBlockMenu(this.props.view.state, this.props.dictionary);
    }
    get embedsGroup() {
        return block_1.getEmbedsGroup(this.props.embeds);
    }
    get allGroups() {
        return [...this.groupedItems, this.embedsGroup];
    }
    get visibleGroups() {
        return this.allGroups
            .map((group) => (Object.assign(Object.assign({}, group), { items: group.items.filter(({ defaultHidden }) => !defaultHidden) })))
            .filter(({ items }) => items.length > 0);
    }
    render() {
        return (react_1.default.createElement(KnowtCommandMenu_1.default, Object.assign({}, this.props, { filterable: true, onClearSearch: this.clearSearch, renderMenuItem: (item, _index, innerRef, options) => {
                return (react_1.default.createElement(BlockMenuItem_1.default, { key: item.title, innerRef: innerRef, onClick: options.onClick, selected: options.selected, isSearch: options.isSearch, icon: item.icon, iconColor: item.iconColor, iconSize: item.iconSize, title: item.title, shortcut: item.shortcut, mainSearchKeyword: item.mainKeyword }));
            }, renderGroupMenuItem: (item, _index, innerRef, options) => {
                return (react_1.default.createElement(BlockGroupMenuItem_1.default, { innerRef: innerRef, key: item.groupData.name, title: item.groupData.name, selected: options.selected, onClick: options.onClick }));
            }, visibleGroups: this.visibleGroups, allGroups: this.allGroups })));
    }
}
exports.default = BlockMenu;
//# sourceMappingURL=BlockMenu.js.map