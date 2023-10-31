{showChoreCompletedMessage ? (
    <View>
      <Text style={{ color: 'red' }}>Chore already completed today</Text>
      <Button
        style={{
          backgroundColor: 'red',
          marginBottom: 5,
          height: 50,
          width: '48%',
        }}
        icon="archive-plus-outline"
        mode="contained"
        onPress={handleCompleteTask}
        labelStyle={{ color: ProjectTheme.colors.secondary }}
        rippleColor={ProjectTheme.colors.background}
      >
        Avklarat
      </Button>
    </View>
  ) : (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
      }}
    >
      <Button
        style={{
          marginBottom: 5,
          height: 50,
          width: '48%',
          justifyContent: 'center',
          backgroundColor: ProjectTheme.colors.primary,
        }}
        icon="archive-plus-outline"
        mode="contained"
        onPress={handleCompleteTask}
        labelStyle={{ color: ProjectTheme.colors.secondary }}
        rippleColor={ProjectTheme.colors.background}
      >
        Avklarat
      </Button>
      {profiles[0].is_owner && (
        <Button
          style={{
            elevation: ProjectTheme.elevation.large,
            marginBottom: 5,
            height: 50,
            width: '48%',
            justifyContent: 'center',
            backgroundColor: ProjectTheme.colors.primary,
          }}
          icon="archive-cog-outline"
          mode="contained"
          onPress={handleEdit}
          labelStyle={{ color: ProjectTheme.colors.secondary }}
          rippleColor={ProjectTheme.colors.background}
        >
          Redigera
        </Button>
      )}
    </View>
  )}
</View>
);
};