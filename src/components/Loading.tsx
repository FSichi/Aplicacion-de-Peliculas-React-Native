import React from 'react';
import { ActivityIndicator, View } from 'react-native';

export const Loading = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator color="red" size={100} />
        </View>
    );
};
