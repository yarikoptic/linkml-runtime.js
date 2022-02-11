import {SchemaDefinition} from "../index"
import {SchemaView, TraversalOptions} from "../index"

let s: SchemaDefinition =
    {
        id: "t1",
        name: "x",
        slots:
            {
                "s1": {
                    name: "s1",
                    description: "test",
                }
            },
        classes: {
            "m1": {
                name: "m1"
            },
            "c1": {
                name: "c1",
                is_a: "c2",
                mixins: ["m1"],
                slots: ["s1"]
            },
            "c2": {
                name: "c2",
                is_a: "c3",
                mixins: [],
                slots: []
            }
        }
    };



describe('schemaview', function() {
    let sv = new SchemaView(s)
    let c = sv.get_class("c1")

    it('ancestors-no-mixins', function() {
        let opts: TraversalOptions = {mixins: false}
        expect(sv.class_ancestors(c.name, opts)).toEqual(["c1", "c2", "c3"]);
    });
    it('ancestors-with-mixins', function() {
        let opts: TraversalOptions = {mixins: true}
        expect(sv.class_ancestors(c.name, opts)).toEqual(["c1", "c2", "m1", "c3"]);
    });

});