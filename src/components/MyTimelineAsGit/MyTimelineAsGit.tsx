/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
import { Gitgraph, templateExtend, TemplateName } from "@gitgraph/react";

const MY_TEMPLATE = templateExtend(TemplateName.Metro, {
    colors: ["#4CAF50", "#9F7AEA", "#FFC107", "#F44336"],
    commit: {
        message: {
            displayHash: false,
            displayAuthor: false,
        },
    },
});

const getOptions = function () {
    return {
        author: "Rohit Macherla",
        template: MY_TEMPLATE,
    };
};

const MyTimelineAsGit = () => {
    const myOptions = getOptions();
    return (
        <Gitgraph options={myOptions}>{(gitgraph) => {
            const master = gitgraph.branch("All technologies that I worked with");
            master.commit("2006");

            const java = gitgraph.branch({
                name: 'Java',
                style: {
                    label: {
                        bgColor: '#9F7AEA',
                        color: '#FFFFFF',
                        borderRadius: 2,
                    },
                },
            });
            java.commit("2006");

            master.commit("");
            const sfdc = gitgraph.branch("Salesforce.com");
            sfdc.commit("2011 - Started using Salesforce.com");
            sfdc.commit("Has been my primary skillset since then");
            master.merge(java, "2012");

            const nodejs = gitgraph.branch("Node.js");
            nodejs.commit("2013 - Node.js");

            master.commit("DevOps as necessary");

            sfdc.commit("Heroku");
            sfdc.commit("Salesforce Lightning");

            master.commit("");
            const python = gitgraph.branch("Python");
            python.commit("2016");
            master.merge(python, "2017");

            const react = gitgraph.branch("React");
            react.commit("2017");
            master.merge(react, "2018");

            const scala = gitgraph.branch("Scala");
            scala.commit("2018");
            master.merge(scala, "2018");

            nodejs.commit("Continuing other using Javascript technologies for hobby projects");

            sfdc.commit("Salesforce LWC");
        }}</Gitgraph>
    )
}

export default MyTimelineAsGit;