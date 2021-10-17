/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
import { Gitgraph, templateExtend, TemplateName } from "@gitgraph/react";

const MY_TEMPLATE = templateExtend(TemplateName.Metro, {
    colors: ["#1A4731", "#DE751F", "#1F9D55", "#606F7B", "#621B18", "#2779BD", "#1C3D5A"],
    commit: {
        message: {
            displayHash: false,
            displayAuthor: false,
        },
    },
});

const getBranchStyle = () => {
    return {
        label: {
            bgColor: '#9F7AEA',
            color: '#FFFFFF',
            borderRadius: 4,
        },
    }
};

const getOptions = () => {
    return {
        author: "Rohit Macherla",
        template: MY_TEMPLATE,
    };
};

const MyTimelineAsGit = () => {
    const myOptions = getOptions();
    return (
        <Gitgraph options={myOptions}>{(gitgraph) => {
            const master = gitgraph.branch("All technologies");
            master.commit("2006");

            const java = gitgraph.branch({
                name: 'Java',
                style: getBranchStyle(),
            });
            java.commit("2006");

            master.commit("");
            const sfdc = gitgraph.branch({
                name: 'Salesforce.com',
                style: getBranchStyle(),
            });
            sfdc.commit("2011 - Started using Salesforce.com");
            sfdc.commit("Has been my primary skillset since then");
            master.merge(java, "2012");

            const nodejs = gitgraph.branch({
                name: 'Node.js',
                style: getBranchStyle(),
            });
            nodejs.commit("2013 - Node.js");

            master.commit("DevOps as necessary");

            sfdc.commit("Heroku");
            sfdc.commit("Salesforce Lightning");

            master.commit("");
            const python = gitgraph.branch({
                name: 'Python',
                style: getBranchStyle(),
            });
            python.commit("2016");
            master.merge(python, "2017");

            const react = gitgraph.branch({
                name: 'React',
                style: getBranchStyle(),
            });
            react.commit("2017");
            master.merge(react, "2018");

            const scala = gitgraph.branch({
                name: 'Scala',
                style: getBranchStyle(),
            });
            scala.commit("2018");
            master.merge(scala, "that I worked with");

            nodejs.commit("Continuing other using Javascript technologies for hobby projects");

            sfdc.commit("Salesforce LWC");
        }}</Gitgraph>
    )
}

export default MyTimelineAsGit;