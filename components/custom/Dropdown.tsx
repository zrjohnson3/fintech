import { View, Text } from 'react-native'
import React from 'react'
import * as DropdownMenu from 'zeego/dropdown-menu'
import RoundBtn from './RoundBtn'

const Dropdown = () => {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <RoundBtn icon={'ellipsis-horizontal'} text={'more'} onPress={() => console.log()} />
            </DropdownMenu.Trigger>

            <DropdownMenu.Content
                loop={false}
                side="bottom"
                align="center"
                alignOffset={0}
                avoidCollisions={true}
                collisionPadding={8}
                sideOffset={4}>
                <DropdownMenu.Item key='statement'>
                    <DropdownMenu.ItemTitle>Statement</DropdownMenu.ItemTitle>
                    <DropdownMenu.ItemIcon ios={{
                        name: 'list.bullet.rectangle.fill',
                        pointSize: 24
                    }} />
                </DropdownMenu.Item>

                <DropdownMenu.Item key='converter'>
                    <DropdownMenu.ItemTitle>Converter</DropdownMenu.ItemTitle>
                    <DropdownMenu.ItemIcon ios={{
                        name: 'coloncurrencysign.arrow.circlepath',
                        pointSize: 24
                    }} />
                </DropdownMenu.Item>

                <DropdownMenu.Item key='background'>
                    <DropdownMenu.ItemTitle>Background</DropdownMenu.ItemTitle>
                    <DropdownMenu.ItemIcon ios={{
                        name: 'photo.fill',
                        pointSize: 24
                    }} />
                </DropdownMenu.Item>

                <DropdownMenu.Item key='account'>
                    <DropdownMenu.ItemTitle>Add new account</DropdownMenu.ItemTitle>
                    <DropdownMenu.ItemIcon ios={{
                        name: 'plus.rectangle.on.folder.fill',
                        pointSize: 24
                    }} />

                </DropdownMenu.Item>


            </DropdownMenu.Content>
        </DropdownMenu.Root>
    )
}

export default Dropdown