const project = {
    name: "project",
    title: "Project",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
            },
        },
        {
            name: "landingPage",
            title: "LandingPage",
            type: "boolean",
        },
        {
            name: "landingPageOrder",
            title: "Landing Page Order",
            type: "number",
        },
        {
            name: "landingPageCover",
            title: "Landing Page Cover",
            type: "object",
            fields: [
                {
                    name: "desktop",
                    title: "Desktop",
                    type: "image",
                },
                {
                    name: "mobile",
                    title: "Mobile",
                    type: "image",
                }
            ],
        },
        {
            name: "category",
            title: "Category",
            type: "string",
            options: {
                list: [
                    { title: "brand & campaign system", value: "brand-campaign-system" },
                    { title: "print & editorial design", value: "print-editorial-design" },
                    { title: "digital design", value: "digital-design" },
                ],
                layout: "radio",
            },
        },
        {
            name: "categoryPageOrder",
            title: "Category Page Order",
            type: "number",
        },

        {
            name: "categoryPageCover",
            title: "Category Page Cover",
            type: "object",
            fields: [
                {
                    name: "image",
                    title: "Image",
                    type: "image",
                },
                {
                    name: "video",
                    title: "Video",
                    type: "object",
                    fields: [
                        {
                            name: "file",
                            title: "File",
                            type: "file",
                            options: {
                                accept: ["video/*"],
                            },
                        },
                        {
                            name: "thumbnail",
                            title: "Thumbnail",
                            type: "image",
                        },
                    ],
                },
            ],
        },
        {
            name: "year",
            title: "Year",
            type: "string",
        },
        {
            name: "description",
            title: "Description",
            type: "text",
        },
        {
            name: "awards",
            title: "Awards",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "year", title: "Year", type: "number" },
                        { name: "award", title: "Award", type: "string" },
                    ],
                },
            ],
        },
        {
            name: "buy",
            title: "Buy",
            type: "url",
        },
        // 内容行数
        {
            name: "row1",
            title: "Row 1",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "image",
                            title: "Image",
                            type: "image",
                        },
                        {
                            name: "video",
                            title: "Video",
                            type: "object",
                            fields: [
                                {
                                    name: "file",
                                    title: "File",
                                    type: "file",
                                    options: {
                                        accept: ["video/*"],
                                    },
                                },
                                {
                                    name: "thumbnail",
                                    title: "Thumbnail",
                                    type: "image",
                                },
                                {
                                    name: "autoplay",
                                    title: "Autoplay",
                                    type: "boolean",
                                },
                                {
                                    name: "aspectRatio",
                                    title: "Aspect Ratio",
                                    type: "string",
                                    options: {
                                        list: [
                                            { title: "16:9", value: "16:9" },
                                            { title: "4:3", value: "4:3" },
                                            { title: "1:1", value: "1:1" },
                                        ],
                                        layout: "radio",
                                    },
                                    initialValue: "16:9",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "row2",
            title: "Row 2",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "image",
                            title: "Image",
                            type: "image",
                        },
                        {
                            name: "video",
                            title: "Video",
                            type: "object",
                            fields: [
                                {
                                    name: "file",
                                    title: "File",
                                    type: "file",
                                    options: {
                                        accept: ["video/*"],
                                    },
                                },
                                {
                                    name: "thumbnail",
                                    title: "Thumbnail",
                                    type: "image",
                                },
                                {
                                    name: "autoplay",
                                    title: "Autoplay",
                                    type: "boolean",
                                },
                                {
                                    name: "aspectRatio",
                                    title: "Aspect Ratio",
                                    type: "string",
                                    options: {
                                        list: [
                                            { title: "16:9", value: "16:9" },
                                            { title: "4:3", value: "4:3" },
                                            { title: "1:1", value: "1:1" },
                                        ],
                                        layout: "radio",
                                    },
                                    initialValue: "16:9",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "row3",
            title: "Row 3",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "image",
                            title: "Image",
                            type: "image",
                        },
                        {
                            name: "video",
                            title: "Video",
                            type: "object",
                            fields: [
                                {
                                    name: "file",
                                    title: "File",
                                    type: "file",
                                    options: {
                                        accept: ["video/*"],
                                    },
                                },
                                {
                                    name: "thumbnail",
                                    title: "Thumbnail",
                                    type: "image",
                                },
                                {
                                    name: "autoplay",
                                    title: "Autoplay",
                                    type: "boolean",
                                },
                                {
                                    name: "aspectRatio",
                                    title: "Aspect Ratio",
                                    type: "string",
                                    options: {
                                        list: [
                                            { title: "16:9", value: "16:9" },
                                            { title: "4:3", value: "4:3" },
                                            { title: "1:1", value: "1:1" },
                                        ],
                                        layout: "radio",
                                    },
                                    initialValue: "16:9",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "row4",
            title: "Row 4",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "image",
                            title: "Image",
                            type: "image",
                        },
                        {
                            name: "video",
                            title: "Video",
                            type: "object",
                            fields: [
                                {
                                    name: "file",
                                    title: "File",
                                    type: "file",
                                    options: {
                                        accept: ["video/*"],
                                    },
                                },
                                {
                                    name: "thumbnail",
                                    title: "Thumbnail",
                                    type: "image",
                                },
                                {
                                    name: "autoplay",
                                    title: "Autoplay",
                                    type: "boolean",
                                },
                                {
                                    name: "aspectRatio",
                                    title: "Aspect Ratio",
                                    type: "string",
                                    options: {
                                        list: [
                                            { title: "16:9", value: "16:9" },
                                            { title: "4:3", value: "4:3" },
                                            { title: "1:1", value: "1:1" },
                                        ],
                                        layout: "radio",
                                    },
                                    initialValue: "16:9",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "row5",
            title: "Row 5",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "image",
                            title: "Image",
                            type: "image",
                        },
                        {
                            name: "video",
                            title: "Video",
                            type: "object",
                            fields: [
                                {
                                    name: "file",
                                    title: "File",
                                    type: "file",
                                    options: {
                                        accept: ["video/*"],
                                    },
                                },
                                {
                                    name: "thumbnail",
                                    title: "Thumbnail",
                                    type: "image",
                                },
                                {
                                    name: "autoplay",
                                    title: "Autoplay",
                                    type: "boolean",
                                },
                                {
                                    name: "aspectRatio",
                                    title: "Aspect Ratio",
                                    type: "string",
                                    options: {
                                        list: [
                                            { title: "16:9", value: "16:9" },
                                            { title: "4:3", value: "4:3" },
                                            { title: "1:1", value: "1:1" },
                                        ],
                                        layout: "radio",
                                    },
                                    initialValue: "16:9",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "row6",
            title: "Row 6",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "image",
                            title: "Image",
                            type: "image",
                        },
                        {
                            name: "video",
                            title: "Video",
                            type: "object",
                            fields: [
                                {
                                    name: "file",
                                    title: "File",
                                    type: "file",
                                    options: {
                                        accept: ["video/*"],
                                    },
                                },
                                {
                                    name: "thumbnail",
                                    title: "Thumbnail",
                                    type: "image",
                                },
                                {
                                    name: "autoplay",
                                    title: "Autoplay",
                                    type: "boolean",
                                },
                                {
                                    name: "aspectRatio",
                                    title: "Aspect Ratio",
                                    type: "string",
                                    options: {
                                        list: [
                                            { title: "16:9", value: "16:9" },
                                            { title: "4:3", value: "4:3" },
                                            { title: "1:1", value: "1:1" },
                                        ],
                                        layout: "radio",
                                    },
                                    initialValue: "16:9",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "row7",
            title: "Row 7",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "image",
                            title: "Image",
                            type: "image",
                        },
                        {
                            name: "video",
                            title: "Video",
                            type: "object",
                            fields: [
                                {
                                    name: "file",
                                    title: "File",
                                    type: "file",
                                    options: {
                                        accept: ["video/*"],
                                    },
                                },
                                {
                                    name: "thumbnail",
                                    title: "Thumbnail",
                                    type: "image",
                                },
                                {
                                    name: "autoplay",
                                    title: "Autoplay",
                                    type: "boolean",
                                },
                                {
                                    name: "aspectRatio",
                                    title: "Aspect Ratio",
                                    type: "string",
                                    options: {
                                        list: [
                                            { title: "16:9", value: "16:9" },
                                            { title: "4:3", value: "4:3" },
                                            { title: "1:1", value: "1:1" },
                                        ],
                                        layout: "radio",
                                    },
                                    initialValue: "16:9",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "row8",
            title: "Row 8",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "image",
                            title: "Image",
                            type: "image",
                        },
                        {
                            name: "video",
                            title: "Video",
                            type: "object",
                            fields: [
                                {
                                    name: "file",
                                    title: "File",
                                    type: "file",
                                    options: {
                                        accept: ["video/*"],
                                    },
                                },
                                {
                                    name: "thumbnail",
                                    title: "Thumbnail",
                                    type: "image",
                                },
                                {
                                    name: "autoplay",
                                    title: "Autoplay",
                                    type: "boolean",
                                },
                                {
                                    name: "aspectRatio",
                                    title: "Aspect Ratio",
                                    type: "string",
                                    options: {
                                        list: [
                                            { title: "16:9", value: "16:9" },
                                            { title: "4:3", value: "4:3" },
                                            { title: "1:1", value: "1:1" },
                                        ],
                                        layout: "radio",
                                    },
                                    initialValue: "16:9",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "row9",
            title: "Row 9",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "image",
                            title: "Image",
                            type: "image",
                        },
                        {
                            name: "video",
                            title: "Video",
                            type: "object",
                            fields: [
                                {
                                    name: "file",
                                    title: "File",
                                    type: "file",
                                    options: {
                                        accept: ["video/*"],
                                    },
                                },
                                {
                                    name: "thumbnail",
                                    title: "Thumbnail",
                                    type: "image",
                                },
                                {
                                    name: "autoplay",
                                    title: "Autoplay",
                                    type: "boolean",
                                },
                                {
                                    name: "aspectRatio",
                                    title: "Aspect Ratio",
                                    type: "string",
                                    options: {
                                        list: [
                                            { title: "16:9", value: "16:9" },
                                            { title: "4:3", value: "4:3" },
                                            { title: "1:1", value: "1:1" },
                                        ],
                                        layout: "radio",
                                    },
                                    initialValue: "16:9",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "row10",
            title: "Row 10",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "image",
                            title: "Image",
                            type: "image",
                        },
                        {
                            name: "video",
                            title: "Video",
                            type: "object",
                            fields: [
                                {
                                    name: "file",
                                    title: "File",
                                    type: "file",
                                    options: {
                                        accept: ["video/*"],
                                    },
                                },
                                {
                                    name: "thumbnail",
                                    title: "Thumbnail",
                                    type: "image",
                                },
                                {
                                    name: "autoplay",
                                    title: "Autoplay",
                                    type: "boolean",
                                },
                                {
                                    name: "aspectRatio",
                                    title: "Aspect Ratio",
                                    type: "string",
                                    options: {
                                        list: [
                                            { title: "16:9", value: "16:9" },
                                            { title: "4:3", value: "4:3" },
                                            { title: "1:1", value: "1:1" },
                                        ],
                                        layout: "radio",
                                    },
                                    initialValue: "16:9",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "row11",
            title: "Row 11",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "image",
                            title: "Image",
                            type: "image",
                        },
                        {
                            name: "video",
                            title: "Video",
                            type: "object",
                            fields: [
                                {
                                    name: "file",
                                    title: "File",
                                    type: "file",
                                    options: {
                                        accept: ["video/*"],
                                    },
                                },
                                {
                                    name: "thumbnail",
                                    title: "Thumbnail",
                                    type: "image",
                                },
                                {
                                    name: "autoplay",
                                    title: "Autoplay",
                                    type: "boolean",
                                },
                                {
                                    name: "aspectRatio",
                                    title: "Aspect Ratio",
                                    type: "string",
                                    options: {
                                        list: [
                                            { title: "16:9", value: "16:9" },
                                            { title: "4:3", value: "4:3" },
                                            { title: "1:1", value: "1:1" },
                                        ],
                                        layout: "radio",
                                    },
                                    initialValue: "16:9",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "row12",
            title: "Row 12",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "image",
                            title: "Image",
                            type: "image",
                        },
                        {
                            name: "video",
                            title: "Video",
                            type: "object",
                            fields: [
                                {
                                    name: "file",
                                    title: "File",
                                    type: "file",
                                    options: {
                                        accept: ["video/*"],
                                    },
                                },
                                {
                                    name: "thumbnail",
                                    title: "Thumbnail",
                                    type: "image",
                                },
                                {
                                    name: "autoplay",
                                    title: "Autoplay",
                                    type: "boolean",
                                },
                                {
                                    name: "aspectRatio",
                                    title: "Aspect Ratio",
                                    type: "string",
                                    options: {
                                        list: [
                                            { title: "16:9", value: "16:9" },
                                            { title: "4:3", value: "4:3" },
                                            { title: "1:1", value: "1:1" },
                                        ],
                                        layout: "radio",
                                    },
                                    initialValue: "16:9",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "row13",
            title: "Row 13",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "image",
                            title: "Image",
                            type: "image",
                        },
                        {
                            name: "video",
                            title: "Video",
                            type: "object",
                            fields: [
                                {
                                    name: "file",
                                    title: "File",
                                    type: "file",
                                    options: {
                                        accept: ["video/*"],
                                    },
                                },
                                {
                                    name: "thumbnail",
                                    title: "Thumbnail",
                                    type: "image",
                                },
                                {
                                    name: "autoplay",
                                    title: "Autoplay",
                                    type: "boolean",
                                },
                                {
                                    name: "aspectRatio",
                                    title: "Aspect Ratio",
                                    type: "string",
                                    options: {
                                        list: [
                                            { title: "16:9", value: "16:9" },
                                            { title: "4:3", value: "4:3" },
                                            { title: "1:1", value: "1:1" },
                                        ],
                                        layout: "radio",
                                    },
                                    initialValue: "16:9",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "row14",
            title: "Row 14",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "image",
                            title: "Image",
                            type: "image",
                        },
                        {
                            name: "video",
                            title: "Video",
                            type: "object",
                            fields: [
                                {
                                    name: "file",
                                    title: "File",
                                    type: "file",
                                    options: {
                                        accept: ["video/*"],
                                    },
                                },
                                {
                                    name: "thumbnail",
                                    title: "Thumbnail",
                                    type: "image",
                                },
                                {
                                    name: "autoplay",
                                    title: "Autoplay",
                                    type: "boolean",
                                },
                                {
                                    name: "aspectRatio",
                                    title: "Aspect Ratio",
                                    type: "string",
                                    options: {
                                        list: [
                                            { title: "16:9", value: "16:9" },
                                            { title: "4:3", value: "4:3" },
                                            { title: "1:1", value: "1:1" },
                                        ],
                                        layout: "radio",
                                    },
                                    initialValue: "16:9",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "row15",
            title: "Row 15",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "image",
                            title: "Image",
                            type: "image",
                        },
                        {
                            name: "video",
                            title: "Video",
                            type: "object",
                            fields: [
                                {
                                    name: "file",
                                    title: "File",
                                    type: "file",
                                    options: {
                                        accept: ["video/*"],
                                    },
                                },
                                {
                                    name: "thumbnail",
                                    title: "Thumbnail",
                                    type: "image",
                                },
                                {
                                    name: "autoplay",
                                    title: "Autoplay",
                                    type: "boolean",
                                },
                                {
                                    name: "aspectRatio",
                                    title: "Aspect Ratio",
                                    type: "string",
                                    options: {
                                        list: [
                                            { title: "16:9", value: "16:9" },
                                            { title: "4:3", value: "4:3" },
                                            { title: "1:1", value: "1:1" },
                                        ],
                                        layout: "radio",
                                    },
                                    initialValue: "16:9",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "row16",
            title: "Row 16",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "image",
                            title: "Image",
                            type: "image",
                        },
                        {
                            name: "video",
                            title: "Video",
                            type: "object",
                            fields: [
                                {
                                    name: "file",
                                    title: "File",
                                    type: "file",
                                    options: {
                                        accept: ["video/*"],
                                    },
                                },
                                {
                                    name: "thumbnail",
                                    title: "Thumbnail",
                                    type: "image",
                                },
                                {
                                    name: "autoplay",
                                    title: "Autoplay",
                                    type: "boolean",
                                },
                                {
                                    name: "aspectRatio",
                                    title: "Aspect Ratio",
                                    type: "string",
                                    options: {
                                        list: [
                                            { title: "16:9", value: "16:9" },
                                            { title: "4:3", value: "4:3" },
                                            { title: "1:1", value: "1:1" },
                                        ],
                                        layout: "radio",
                                    },
                                    initialValue: "16:9",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "row17",
            title: "Row 17",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "image",
                            title: "Image",
                            type: "image",
                        },
                        {
                            name: "video",
                            title: "Video",
                            type: "object",
                            fields: [
                                {
                                    name: "file",
                                    title: "File",
                                    type: "file",
                                    options: {
                                        accept: ["video/*"],
                                    },
                                },
                                {
                                    name: "thumbnail",
                                    title: "Thumbnail",
                                    type: "image",
                                },
                                {
                                    name: "autoplay",
                                    title: "Autoplay",
                                    type: "boolean",
                                },
                                {
                                    name: "aspectRatio",
                                    title: "Aspect Ratio",
                                    type: "string",
                                    options: {
                                        list: [
                                            { title: "16:9", value: "16:9" },
                                            { title: "4:3", value: "4:3" },
                                            { title: "1:1", value: "1:1" },
                                        ],
                                        layout: "radio",
                                    },
                                    initialValue: "16:9",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "row18",
            title: "Row 18",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "image",
                            title: "Image",
                            type: "image",
                        },
                        {
                            name: "video",
                            title: "Video",
                            type: "object",
                            fields: [
                                {
                                    name: "file",
                                    title: "File",
                                    type: "file",
                                    options: {
                                        accept: ["video/*"],
                                    },
                                },
                                {
                                    name: "thumbnail",
                                    title: "Thumbnail",
                                    type: "image",
                                },
                                {
                                    name: "aspectRatio",
                                    title: "Aspect Ratio",
                                    type: "string",
                                    options: {
                                        list: [
                                            { title: "16:9", value: "16:9" },
                                            { title: "4:3", value: "4:3" },
                                            { title: "1:1", value: "1:1" },
                                        ],
                                        layout: "radio",
                                    },
                                    initialValue: "16:9",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "row19",
            title: "Row 19",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "image",
                            title: "Image",
                            type: "image",
                        },
                        {
                            name: "video",
                            title: "Video",
                            type: "object",
                            fields: [
                                {
                                    name: "file",
                                    title: "File",
                                    type: "file",
                                    options: {
                                        accept: ["video/*"],
                                    },
                                },
                                {
                                    name: "thumbnail",
                                    title: "Thumbnail",
                                    type: "image",
                                },
                                {
                                    name: "autoplay",
                                    title: "Autoplay",
                                    type: "boolean",
                                },
                                {
                                    name: "aspectRatio",
                                    title: "Aspect Ratio",
                                    type: "string",
                                    options: {
                                        list: [
                                            { title: "16:9", value: "16:9" },
                                            { title: "4:3", value: "4:3" },
                                            { title: "1:1", value: "1:1" },
                                        ],
                                        layout: "radio",
                                    },
                                    initialValue: "16:9",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "row20",
            title: "Row 20",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "image",
                            title: "Image",
                            type: "image",
                        },
                        {
                            name: "video",
                            title: "Video",
                            type: "object",
                            fields: [
                                {
                                    name: "file",
                                    title: "File",
                                    type: "file",
                                    options: {
                                        accept: ["video/*"],
                                    },
                                },
                                {
                                    name: "thumbnail",
                                    title: "Thumbnail",
                                    type: "image",
                                },
                                {
                                    name: "autoplay",
                                    title: "Autoplay",
                                    type: "boolean",
                                },
                                {
                                    name: "aspectRatio",
                                    title: "Aspect Ratio",
                                    type: "string",
                                    options: {
                                        list: [
                                            { title: "16:9", value: "16:9" },
                                            { title: "4:3", value: "4:3" },
                                            { title: "1:1", value: "1:1" },
                                        ],
                                        layout: "radio",
                                    },
                                    initialValue: "16:9",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "row21",
            title: "Row 21",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "image",
                            title: "Image",
                            type: "image",
                        },
                        {
                            name: "video",
                            title: "Video",
                            type: "object",
                            fields: [
                                {
                                    name: "file",
                                    title: "File",
                                    type: "file",
                                    options: {
                                        accept: ["video/*"],
                                    },
                                },
                                {
                                    name: "thumbnail",
                                    title: "Thumbnail",
                                    type: "image",
                                },
                                {
                                    name: "autoplay",
                                    title: "Autoplay",
                                    type: "boolean",
                                },
                                {
                                    name: "aspectRatio",
                                    title: "Aspect Ratio",
                                    type: "string",
                                    options: {
                                        list: [
                                            { title: "16:9", value: "16:9" },
                                            { title: "4:3", value: "4:3" },
                                            { title: "1:1", value: "1:1" },
                                        ],
                                        layout: "radio",
                                    },
                                    initialValue: "16:9",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "row22",
            title: "Row 22",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "image",
                            title: "Image",
                            type: "image",
                        },
                        {
                            name: "video",
                            title: "Video",
                            type: "object",
                            fields: [
                                {
                                    name: "file",
                                    title: "File",
                                    type: "file",
                                    options: {
                                        accept: ["video/*"],
                                    },
                                },
                                {
                                    name: "thumbnail",
                                    title: "Thumbnail",
                                    type: "image",
                                },
                                {
                                    name: "autoplay",
                                    title: "Autoplay",
                                    type: "boolean",
                                },
                                {
                                    name: "aspectRatio",
                                    title: "Aspect Ratio",
                                    type: "string",
                                    options: {
                                        list: [
                                            { title: "16:9", value: "16:9" },
                                            { title: "4:3", value: "4:3" },
                                            { title: "1:1", value: "1:1" },
                                        ],
                                        layout: "radio",
                                    },
                                    initialValue: "16:9",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "row23",
            title: "Row 23",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "image",
                            title: "Image",
                            type: "image",
                        },
                        {
                            name: "video",
                            title: "Video",
                            type: "object",
                            fields: [
                                {
                                    name: "file",
                                    title: "File",
                                    type: "file",
                                    options: {
                                        accept: ["video/*"],
                                    },
                                },
                                {
                                    name: "thumbnail",
                                    title: "Thumbnail",
                                    type: "image",
                                },
                                {
                                    name: "autoplay",
                                    title: "Autoplay",
                                    type: "boolean",
                                },
                                {
                                    name: "aspectRatio",
                                    title: "Aspect Ratio",
                                    type: "string",
                                    options: {
                                        list: [
                                            { title: "16:9", value: "16:9" },
                                            { title: "4:3", value: "4:3" },
                                            { title: "1:1", value: "1:1" },
                                        ],
                                        layout: "radio",
                                    },
                                    initialValue: "16:9",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "row24",
            title: "Row 24",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "image",
                            title: "Image",
                            type: "image",
                        },
                        {
                            name: "video",
                            title: "Video",
                            type: "object",
                            fields: [
                                {
                                    name: "file",
                                    title: "File",
                                    type: "file",
                                    options: {
                                        accept: ["video/*"],
                                    },
                                },
                                {
                                    name: "thumbnail",
                                    title: "Thumbnail",
                                    type: "image",
                                },
                                {
                                    name: "autoplay",
                                    title: "Autoplay",
                                    type: "boolean",
                                },
                                {
                                    name: "aspectRatio",
                                    title: "Aspect Ratio",
                                    type: "string",
                                    options: {
                                        list: [
                                            { title: "16:9", value: "16:9" },
                                            { title: "4:3", value: "4:3" },
                                            { title: "1:1", value: "1:1" },
                                        ],
                                        layout: "radio",
                                    },
                                    initialValue: "16:9",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "row25",
            title: "Row 25",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "image",
                            title: "Image",
                            type: "image",
                        },
                        {
                            name: "video",
                            title: "Video",
                            type: "object",
                            fields: [
                                {
                                    name: "file",
                                    title: "File",
                                    type: "file",
                                    options: {
                                        accept: ["video/*"],
                                    },
                                },
                                {
                                    name: "thumbnail",
                                    title: "Thumbnail",
                                    type: "image",
                                },
                                {
                                    name: "autoplay",
                                    title: "Autoplay",
                                    type: "boolean",
                                },
                                {
                                    name: "aspectRatio",
                                    title: "Aspect Ratio",
                                    type: "string",
                                    options: {
                                        list: [
                                            { title: "16:9", value: "16:9" },
                                            { title: "4:3", value: "4:3" },
                                            { title: "1:1", value: "1:1" },
                                        ],
                                        layout: "radio",
                                    },
                                    initialValue: "16:9",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "row26",
            title: "Row 26",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "image",
                            title: "Image",
                            type: "image",
                        },
                        {
                            name: "video",
                            title: "Video",
                            type: "object",
                            fields: [
                                {
                                    name: "file",
                                    title: "File",
                                    type: "file",
                                    options: {
                                        accept: ["video/*"],
                                    },
                                },
                                {
                                    name: "thumbnail",
                                    title: "Thumbnail",
                                    type: "image",
                                },
                                {
                                    name: "autoplay",
                                    title: "Autoplay",
                                    type: "boolean",
                                },
                                {
                                    name: "aspectRatio",
                                    title: "Aspect Ratio",
                                    type: "string",
                                    options: {
                                        list: [
                                            { title: "16:9", value: "16:9" },
                                            { title: "4:3", value: "4:3" },
                                            { title: "1:1", value: "1:1" },
                                        ],
                                        layout: "radio",
                                    },
                                    initialValue: "16:9",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "row27",
            title: "Row 27",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "image",
                            title: "Image",
                            type: "image",
                        },
                        {
                            name: "video",
                            title: "Video",
                            type: "object",
                            fields: [
                                {
                                    name: "file",
                                    title: "File",
                                    type: "file",
                                    options: {
                                        accept: ["video/*"],
                                    },
                                },
                                {
                                    name: "thumbnail",
                                    title: "Thumbnail",
                                    type: "image",
                                },
                                {
                                    name: "autoplay",
                                    title: "Autoplay",
                                    type: "boolean",
                                },
                                {
                                    name: "aspectRatio",
                                    title: "Aspect Ratio",
                                    type: "string",
                                    options: {
                                        list: [
                                            { title: "16:9", value: "16:9" },
                                            { title: "4:3", value: "4:3" },
                                            { title: "1:1", value: "1:1" },
                                        ],
                                        layout: "radio",
                                    },
                                    initialValue: "16:9",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "row28",
            title: "Row 28",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "image",
                            title: "Image",
                            type: "image",
                        },
                        {
                            name: "video",
                            title: "Video",
                            type: "object",
                            fields: [
                                {
                                    name: "file",
                                    title: "File",
                                    type: "file",
                                    options: {
                                        accept: ["video/*"],
                                    },
                                },
                                {
                                    name: "thumbnail",
                                    title: "Thumbnail",
                                    type: "image",
                                },
                                {
                                    name: "autoplay",
                                    title: "Autoplay",
                                    type: "boolean",
                                },
                                {
                                    name: "aspectRatio",
                                    title: "Aspect Ratio",
                                    type: "string",
                                    options: {
                                        list: [
                                            { title: "16:9", value: "16:9" },
                                            { title: "4:3", value: "4:3" },
                                            { title: "1:1", value: "1:1" },
                                        ],
                                        layout: "radio",
                                    },
                                    initialValue: "16:9",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "row29",
            title: "Row 29",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "image",
                            title: "Image",
                            type: "image",
                        },
                        {
                            name: "video",
                            title: "Video",
                            type: "object",
                            fields: [
                                {
                                    name: "file",
                                    title: "File",
                                    type: "file",
                                    options: {
                                        accept: ["video/*"],
                                    },
                                },
                                {
                                    name: "thumbnail",
                                    title: "Thumbnail",
                                    type: "image",
                                },
                                {
                                    name: "autoplay",
                                    title: "Autoplay",
                                    type: "boolean",
                                },
                                {
                                    name: "aspectRatio",
                                    title: "Aspect Ratio",
                                    type: "string",
                                    options: {
                                        list: [
                                            { title: "16:9", value: "16:9" },
                                            { title: "4:3", value: "4:3" },
                                            { title: "1:1", value: "1:1" },
                                        ],
                                        layout: "radio",
                                    },
                                    initialValue: "16:9",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "row30",
            title: "Row 30",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "image",
                            title: "Image",
                            type: "image",
                        },
                        {
                            name: "video",
                            title: "Video",
                            type: "object",
                            fields: [
                                {
                                    name: "file",
                                    title: "File",
                                    type: "file",
                                    options: {
                                        accept: ["video/*"],
                                    },
                                },
                                {
                                    name: "thumbnail",
                                    title: "Thumbnail",
                                    type: "image",
                                },
                                {
                                    name: "autoplay",
                                    title: "Autoplay",
                                    type: "boolean",
                                },
                                {
                                    name: "aspectRatio",
                                    title: "Aspect Ratio",
                                    type: "string",
                                    options: {
                                        list: [
                                            { title: "16:9", value: "16:9" },
                                            { title: "4:3", value: "4:3" },
                                            { title: "1:1", value: "1:1" },
                                        ],
                                        layout: "radio",
                                    },
                                    initialValue: "16:9",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "row31",
            title: "Row 31",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "image",
                            title: "Image",
                            type: "image",
                        },
                        {
                            name: "video",
                            title: "Video",
                            type: "object",
                            fields: [
                                {
                                    name: "file",
                                    title: "File",
                                    type: "file",
                                    options: {
                                        accept: ["video/*"],
                                    },
                                },
                                {
                                    name: "thumbnail",
                                    title: "Thumbnail",
                                    type: "image",
                                },
                                {
                                    name: "autoplay",
                                    title: "Autoplay",
                                    type: "boolean",
                                },
                                {
                                    name: "aspectRatio",
                                    title: "Aspect Ratio",
                                    type: "string",
                                    options: {
                                        list: [
                                            { title: "16:9", value: "16:9" },
                                            { title: "4:3", value: "4:3" },
                                            { title: "1:1", value: "1:1" },
                                        ],
                                        layout: "radio",
                                    },
                                    initialValue: "16:9",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "row32",
            title: "Row 32",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "image",
                            title: "Image",
                            type: "image",
                        },
                        {
                            name: "video",
                            title: "Video",
                            type: "object",
                            fields: [
                                {
                                    name: "file",
                                    title: "File",
                                    type: "file",
                                    options: {
                                        accept: ["video/*"],
                                    },
                                },
                                {
                                    name: "thumbnail",
                                    title: "Thumbnail",
                                    type: "image",
                                },
                                {
                                    name: "autoplay",
                                    title: "Autoplay",
                                    type: "boolean",
                                },
                                {
                                    name: "aspectRatio",
                                    title: "Aspect Ratio",
                                    type: "string",
                                    options: {
                                        list: [
                                            { title: "16:9", value: "16:9" },
                                            { title: "4:3", value: "4:3" },
                                            { title: "1:1", value: "1:1" },
                                        ],
                                        layout: "radio",
                                    },
                                    initialValue: "16:9",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "row33",
            title: "Row 33",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "image",
                            title: "Image",
                            type: "image",
                        },
                        {
                            name: "video",
                            title: "Video",
                            type: "object",
                            fields: [
                                {
                                    name: "file",
                                    title: "File",
                                    type: "file",
                                    options: {
                                        accept: ["video/*"],
                                    },
                                },
                                {
                                    name: "thumbnail",
                                    title: "Thumbnail",
                                    type: "image",
                                },
                                {
                                    name: "autoplay",
                                    title: "Autoplay",
                                    type: "boolean",
                                },
                                {
                                    name: "aspectRatio",
                                    title: "Aspect Ratio",
                                    type: "string",
                                    options: {
                                        list: [
                                            { title: "16:9", value: "16:9" },
                                            { title: "4:3", value: "4:3" },
                                            { title: "1:1", value: "1:1" },
                                        ],
                                        layout: "radio",
                                    },
                                    initialValue: "16:9",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "row34",
            title: "Row 34",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "image",
                            title: "Image",
                            type: "image",
                        },
                        {
                            name: "video",
                            title: "Video",
                            type: "object",
                            fields: [
                                {
                                    name: "file",
                                    title: "File",
                                    type: "file",
                                    options: {
                                        accept: ["video/*"],
                                    },
                                },
                                {
                                    name: "thumbnail",
                                    title: "Thumbnail",
                                    type: "image",
                                },
                                {
                                    name: "autoplay",
                                    title: "Autoplay",
                                    type: "boolean",
                                },
                                {
                                    name: "aspectRatio",
                                    title: "Aspect Ratio",
                                    type: "string",
                                    options: {
                                        list: [
                                            { title: "16:9", value: "16:9" },
                                            { title: "4:3", value: "4:3" },
                                            { title: "1:1", value: "1:1" },
                                        ],
                                        layout: "radio",
                                    },
                                    initialValue: "16:9",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "row35",
            title: "Row 35",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "image",
                            title: "Image",
                            type: "image",
                        },
                        {
                            name: "video",
                            title: "Video",
                            type: "object",
                            fields: [
                                {
                                    name: "file",
                                    title: "File",
                                    type: "file",
                                    options: {
                                        accept: ["video/*"],
                                    },
                                },
                                {
                                    name: "thumbnail",
                                    title: "Thumbnail",
                                    type: "image",
                                },
                                {
                                    name: "autoplay",
                                    title: "Autoplay",
                                    type: "boolean",
                                },
                                {
                                    name: "aspectRatio",
                                    title: "Aspect Ratio",
                                    type: "string",
                                    options: {
                                        list: [
                                            { title: "16:9", value: "16:9" },
                                            { title: "4:3", value: "4:3" },
                                            { title: "1:1", value: "1:1" },
                                        ],
                                        layout: "radio",
                                    },
                                    initialValue: "16:9",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
};

export default project;
