import React from "react";
import { create,act } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("Profile status", () => {
    test("block with status text should be displayed", () => {
        let  component
        act(()=>{
           component =  create(<ProfileStatus status={'New status'} />);
        })
        const instance = component.root;
        const status = instance.findByProps({className:"statusText"});
        act(()=>{
            expect(status).toBeDefined();
        })
    });
    test("block with input shouldn`t be displayed", () => {
        let  component
        act(()=>{
           component =  create(<ProfileStatus status={'New status'} />);
        })
        const instance = component.root;
        let input
        act(()=>{
            expect(()=>{
                input = instance.findByProps({className:"statusInput"});
                input.toBeDefined()
            }).toThrowError()
        })
    });
});