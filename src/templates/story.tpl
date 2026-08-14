import {{{%name%}}} from './{{%name%}}';

import type {Meta, StoryObj} from '@storybook/nextjs-vite';

const meta = {
    args: {
        height: 60,
        width: 60
    },
    argTypes: {color1: {control: 'color'}},
    component: {{%name%}}
} satisfies Meta<typeof {{%name%}}>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};