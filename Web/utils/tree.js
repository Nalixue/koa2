/** 一棵二叉树的表现方式 */
// var tree = {
//     value: "-",
//     left: {
//         value: '+',
//         left: {
//             value: 'a',
//         },
//         right: {
//             value: '*',
//             left: {
//                 value: 'b',
//             },
//             right: {
//                 value: 'c',
//             }
//         }
//     },
//     right: {
//         value: '/',
//         left: {
//             value: 'd',
//         },
//         right: {
//             value: 'e',
//         }
//     }
// }

/**
 * 前序遍历: 先序递归遍历的思路是先遍历根结点，将值存入数组，然后递归遍历
 */
let treeList = [];
const preOrderRec = function (node) {
    if (!node) { return; }
    preOrderRec(node.left);
    preOrderRec(node.right);
}
preOrderRec(tree);
console.log(treeList)