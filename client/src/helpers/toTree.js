/**
 * Unflattens an array to a tree with runtime O(n)
 *
 * This algorithm was taken from Philip Stanislaus's "Performant Array to Tree"
 * which has O(n) complexity. It builds the tree in a single pass.
 * @link https://github.com/philipstanislaus
 * @link https://www.npmjs.com/package/performant-array-to-tree
 */
module.exports = {

    arrayToTree(items) {


        /**
         * The nested tree.
         * @type {*[]}
         */
        const rootItems = [];

        /**
         * Stores all already processed items with their ids as
         * key so we can easily look them up
         * @type {{}}
         */
        const lookup = {};

        /* ==================================================================
         * Idea of this loop:
         * ==================================================================
         * Whenever an item has a parent, but the parent is not yet in the
         * lookup object, we store a preliminary parent in the lookup object
         * and fill it with the data of the parent later if an item has no
         * parentId, add it as a root element to rootItems
         */

        for (const item of items) {

            const itemId = item['ID_Podzespol']
            const parentId = item['pdz_rodzic']

            /*
             * Check whether item already exists in the lookup table. If not,
             * add a placeholder. We'll add the details later.
             */
            if (!lookup[itemId]) lookup[itemId] = {['children']: []}

            /*
             * Fill in the details of our previously-created placeholder
             * in the lookup table.
             */
            lookup[itemId] = {...item, ['children']: lookup[itemId]['children']}

            /*
             * Create a symbol for our item.
             */
            const TreeItem = lookup[itemId]

            /* ==================================================================
             * Determine where the item goes in the tree.
             * ================================================================== */

            /*
             * If the item has no parentId, it is the root node.
             */

            if (parentId === null || parentId === undefined || parentId === 0 || parentId === '') {

                rootItems.push(TreeItem)
            }

            /*
             * If the item has a parentId, add it to the tree.
             */

            else {
                /*
                 * Check whether the parent already exists in the lookup table.
                 * If not, add a placeholder. We'll add the details later.
                 */

                if (!lookup[parentId]) lookup[parentId] = {['children']: []}

                /*
                 * Add the current item to the parent
                 */

                lookup[parentId]['children'].push(TreeItem)

                //sort((a,b) => (a.pdz_rodzic > b.pdz_rodzic ? 1 :-1))
            }
        }

        return rootItems
    }
}



